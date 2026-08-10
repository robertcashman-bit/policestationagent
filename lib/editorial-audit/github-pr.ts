import { getAuditConfig } from './config';
import type { FilePatch } from './fix-registry';

async function ghFetch(path: string, init: RequestInit & { token: string }) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${init.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${path}: ${res.status} ${body}`);
  }
  return res.json();
}

export async function openAuditPullRequest(patches: FilePatch[]): Promise<string | undefined> {
  const cfg = getAuditConfig();
  if (!cfg.githubToken || patches.length === 0) return undefined;

  const [owner, repo] = cfg.githubRepo.split('/');
  if (!owner || !repo) return undefined;

  const date = new Date().toISOString().slice(0, 10);
  const branch = `audit/fixes-${date}`;
  const token = cfg.githubToken;

  const mainRef = await ghFetch(`/repos/${owner}/${repo}/git/ref/heads/master`, { token });
  const baseSha = mainRef.object.sha as string;

  try {
    await ghFetch(`/repos/${owner}/${repo}/git/refs`, {
      token,
      method: 'POST',
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: baseSha }),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (!msg.includes('422')) throw e;
  }

  for (const patch of patches) {
    let fileSha: string | undefined;
    try {
      const existing = await ghFetch(`/repos/${owner}/${repo}/contents/${patch.path}?ref=${branch}`, { token });
      fileSha = existing.sha as string;
    } catch {
      /* new file */
    }

    await ghFetch(`/repos/${owner}/${repo}/contents/${patch.path}`, {
      token,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `[audit] ${patch.reason}`,
        content: Buffer.from(patch.content, 'utf8').toString('base64'),
        branch,
        ...(fileSha ? { sha: fileSha } : {}),
      }),
    });
  }

  const pr = await ghFetch(`/repos/${owner}/${repo}/pulls`, {
    token,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: `[audit] Editorial fixes — ${date}`,
      head: branch,
      base: 'master',
      body: patches.map((p) => `- **${p.path}**: ${p.reason}`).join('\n'),
    }),
  });

  return pr.html_url as string;
}
