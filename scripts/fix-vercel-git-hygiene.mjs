#!/usr/bin/env node
/**
 * Disconnect duplicate Git integrations and fix domain conflicts.
 * Dry-run: node scripts/fix-vercel-git-hygiene.mjs
 * Apply:   node scripts/fix-vercel-git-hygiene.mjs --apply
 */
import https from 'node:https';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const APPLY = process.argv.includes('--apply');
const TEAM_ID = 'team_wbvkpoLfvbg9qFwg5LqJLAjN';

const DISCONNECT = [
  { id: 'prj_BFQPZuYlXvqmKCdfuTrQnljCJTjH', name: 'policestationagent', reason: 'duplicate of web44ai' },
  { id: 'prj_IRp2esBdLxek2R9ODxp6K08MrBvQ', name: 'policestationrepuk', reason: 'superseded by policestationrepuk-new' },
  { id: 'prj_QHDkkEPNU5GRExHtFy184AqA4886', name: 'one', reason: 'stale super-parakeet; custody-note-website is canonical' },
];

const REMOVE_DOMAINS = [
  {
    projectId: 'prj_YmT07zsfEFt46BLRWNNntxccgklI',
    name: 'psrdirectory',
    domains: ['policestationrepukdirectory.com', 'www.policestationrepukdirectory.com'],
  },
];

const DISABLE_PROTECTION = [{ id: 'prj_uJSNdPK7XUfrt5qzVvZxkQgAlA6I', name: 'pstrain-rebuild' }];

function loadToken() {
  if (process.env.VERCEL_TOKEN) return process.env.VERCEL_TOKEN.trim();
  const authPath = path.join(os.homedir(), 'Library/Application Support/com.vercel.cli/auth.json');
  if (!fs.existsSync(authPath)) throw new Error('No VERCEL_TOKEN and no CLI auth.json');
  const auth = JSON.parse(fs.readFileSync(authPath, 'utf8'));
  const entry = auth.token || auth.tokens?.[0]?.token || auth.credentials?.[0]?.token;
  if (!entry) throw new Error('Could not read token from Vercel CLI auth.json');
  return entry;
}

function api(method, apiPath, body = null) {
  const token = loadToken();
  const sep = apiPath.includes('?') ? '&' : '?';
  const pathWithTeam = apiPath.includes('teamId=') ? apiPath : `${apiPath}${sep}teamId=${TEAM_ID}`;
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.vercel.com',
        path: pathWithTeam,
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          let parsed = data;
          try {
            parsed = JSON.parse(data || '{}');
          } catch {
            /* raw */
          }
          resolve({ status: res.statusCode, data: parsed });
        });
      }
    );
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getProjectLink(projectId) {
  const res = await api('GET', `/v9/projects/${projectId}`);
  if (res.status !== 200) return { error: res.status, data: res.data };
  const link = res.data?.link || null;
  return { link, name: res.data?.name };
}

async function main() {
  console.log(APPLY ? '=== APPLY mode ===' : '=== DRY RUN (pass --apply to execute) ===\n');

  for (const p of DISCONNECT) {
    const info = await getProjectLink(p.id);
    const repo = info.link ? `${info.link.org || info.link.type}/${info.link.repo}` : '(not connected)';
    console.log(`[git] ${p.name} (${p.id}): connected=${repo} — ${p.reason}`);
    if (info.link && APPLY) {
      const res = await api('DELETE', `/v9/projects/${p.id}/link`);
      console.log(`  → disconnect ${res.status}`, typeof res.data === 'object' ? JSON.stringify(res.data).slice(0, 120) : res.data);
    }
  }

  for (const p of REMOVE_DOMAINS) {
    for (const domain of p.domains) {
      console.log(`[domain] remove ${domain} from ${p.name}`);
      if (APPLY) {
        const res = await api('DELETE', `/v9/projects/${p.projectId}/domains/${domain}`);
        console.log(`  → ${res.status}`, typeof res.data === 'object' ? JSON.stringify(res.data).slice(0, 120) : res.data);
      }
    }
  }

  for (const p of DISABLE_PROTECTION) {
    console.log(`[protection] disable on ${p.name}`);
    if (APPLY) {
      const res1 = await api('PATCH', `/v9/projects/${p.id}`, {
        ssoProtection: null,
        passwordProtection: null,
      });
      const res2 = await api('PATCH', `/v1/projects/${p.id}/deployment-protection`, {
        deploymentProtection: {
          deploymentType: 'prod_deployment_urls_and_all_previews',
          standard: { protectionMode: 'none' },
        },
      });
      console.log(`  → project PATCH ${res1.status}, protection PATCH ${res2.status}`);
    }
  }

  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
