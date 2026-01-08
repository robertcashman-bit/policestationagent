import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || "robertdavidcashman-droid/one";
const JSON_FILE_PATH = "data/blog-posts-full.json";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    environment: {
      GITHUB_TOKEN_SET: !!GITHUB_TOKEN,
      GITHUB_TOKEN_LENGTH: GITHUB_TOKEN?.length || 0,
      GITHUB_TOKEN_PREFIX: GITHUB_TOKEN ? GITHUB_TOKEN.substring(0, 10) + "..." : "NOT SET",
      GITHUB_REPO: GITHUB_REPO,
      JSON_FILE_PATH: JSON_FILE_PATH,
      VERCEL: process.env.VERCEL || "false",
    },
    tests: {},
  };

  // Test 1: Check if token format is valid
  if (!GITHUB_TOKEN) {
    results.tests.tokenCheck = { success: false, error: "GITHUB_TOKEN not set" };
    return NextResponse.json(results);
  }

  if (!GITHUB_TOKEN.startsWith("ghp_") && !GITHUB_TOKEN.startsWith("github_pat_")) {
    results.tests.tokenCheck = {
      success: false,
      error: `Token format may be invalid. Expected ghp_* or github_pat_*, got: ${GITHUB_TOKEN.substring(0, 10)}...`,
    };
  } else {
    results.tests.tokenCheck = { success: true, message: "Token format looks valid" };
  }

  // Test 2: Validate token with GitHub API
  try {
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      results.tests.tokenValidation = {
        success: true,
        user: userData.login,
        message: `Token is valid for user: ${userData.login}`,
      };
    } else {
      const errorData = await userResponse.json();
      results.tests.tokenValidation = {
        success: false,
        status: userResponse.status,
        error: errorData.message,
      };
      return NextResponse.json(results);
    }
  } catch (error) {
    results.tests.tokenValidation = { success: false, error: String(error) };
    return NextResponse.json(results);
  }

  // Test 3: Check repo access
  const [owner, repo] = GITHUB_REPO.split("/");
  try {
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (repoResponse.ok) {
      const repoData = await repoResponse.json();
      results.tests.repoAccess = {
        success: true,
        repo: repoData.full_name,
        default_branch: repoData.default_branch,
        permissions: repoData.permissions,
      };
    } else {
      const errorData = await repoResponse.json();
      results.tests.repoAccess = {
        success: false,
        status: repoResponse.status,
        error: errorData.message,
      };
      return NextResponse.json(results);
    }
  } catch (error) {
    results.tests.repoAccess = { success: false, error: String(error) };
    return NextResponse.json(results);
  }

  // Test 4: Check if JSON file exists in repo
  try {
    const fileResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${JSON_FILE_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (fileResponse.ok) {
      const fileData = await fileResponse.json();
      results.tests.fileAccess = {
        success: true,
        sha: fileData.sha,
        size: fileData.size,
        path: fileData.path,
      };
    } else {
      const errorData = await fileResponse.json();
      results.tests.fileAccess = {
        success: false,
        status: fileResponse.status,
        error: errorData.message,
        suggestion: "File may not exist in repo or path is incorrect",
      };
    }
  } catch (error) {
    results.tests.fileAccess = { success: false, error: String(error) };
  }

  // Summary
  const allPassed = Object.values(results.tests).every((t: any) => t.success);
  results.summary = {
    allTestsPassed: allPassed,
    readyToPublish: allPassed,
    message: allPassed
      ? "✅ GitHub integration is working! Posts should persist correctly."
      : "❌ Some tests failed. Check the errors above.",
  };

  return NextResponse.json(results, { status: 200 });
}
