# Website Download Integration Guide

This guide explains how the front-end developers for **studio.xloudone.com** (or any other landing page) should implement the "Download Xstudio" button. 

The goal is to automatically detect the user's operating system (macOS vs. Windows) and fetch the latest corresponding binary (.dmg or .exe) directly from the public `Xstudio-Releases` repository.

---

## 1. Get the Latest Release GitHub API
Because the `Xstudio-Releases` repository is public, you can fetch the latest release data completely unauthenticated using the GitHub REST API:

**Endpoint:**
`GET https://api.github.com/repos/Xloudone/Xstudio-Releases/releases/latest`

This will return a JSON object representing the latest release. The `assets` array within that object will contain all the uploaded files for that release (e.g., `Xstudio-0.1.1.dmg`, `Xstudio-0.1.1-mac.zip`, `Xstudio-Setup-0.1.1.exe`).

## 2. Detect the User's Operating System
You can use standard JavaScript `navigator.userAgent` or the modern `navigator.userAgentData` to determine if the user is visiting the website from a Mac or a Windows machine.

```javascript
/**
 * Utility to identify the user's current Operating System
 * @returns {"mac" | "win" | "other"}
 */
function detectOS() {
  const platform = window.navigator?.userAgentData?.platform || window.navigator.platform;
  const userAgent = window.navigator.userAgent;
  
  const macPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

  if (macPlatforms.indexOf(platform) !== -1 || /Macintosh|Mac OS X/i.test(userAgent)) {
    return 'mac';
  } else if (windowsPlatforms.indexOf(platform) !== -1 || /Windows/i.test(userAgent)) {
    return 'win';
  }
  
  return 'other'; // Linux, Mobile, etc.
}
```

## 3. Find the Correct Asset URL
Once you fetch the latest release JSON, filter the `assets` array to find the file extension that matches the user's OS:
- **Mac:** Look for files ending in `.dmg`
- **Windows:** Look for files ending in `.exe`

Grab the `browser_download_url` for that specific asset.

## 4. Example Integration Code (React)
Here is a complete, drop-in React hook and component you can use on the front-end to dynamically render the correct download button.

```tsx
import React, { useState, useEffect } from 'react';

export default function DownloadButton() {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [os, setOs] = useState<"mac" | "win" | "other" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Detect OS
    const platform = window.navigator?.userAgentData?.platform || window.navigator.platform;
    const ua = window.navigator.userAgent;
    
    let detectedOs: "mac" | "win" | "other" = "other";
    if (/Macintosh|Mac OS X/i.test(ua)) detectedOs = "mac";
    if (/Windows/i.test(ua)) detectedOs = "win";
    
    setOs(detectedOs);

    // 2. Fetch Latest Release Assets
    const fetchLatestRelease = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/Xloudone/Xstudio-Releases/releases/latest');
        const data = await res.json();

        // 3. Find the right file extension for the detected OS
        const extension = detectedOs === 'mac' ? '.dmg' : '.exe';
        
        const targetAsset = data.assets.find((asset: any) => 
          asset.name.endsWith(extension) && 
          // Avoid the '-arm64.dmg' specific ones unless you're writing custom M1 detection
          !asset.name.includes('blockmap')
        );

        if (targetAsset) {
          setDownloadUrl(targetAsset.browser_download_url);
        }
      } catch (error) {
        console.error("Failed to fetch latest Xstudio release:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRelease();
  }, []);

  if (loading) return <button disabled>Loading Download...</button>;
  
  if (os === 'other') {
    return <p>Xstudio is currently only available for macOS and Windows.</p>;
  }

  // Fallback to GitHub Releases page if API fails
  const fallbackUrl = "https://github.com/Xloudone/Xstudio-Releases/releases/latest";

  return (
    <a 
      href={downloadUrl || fallbackUrl} 
      className="btn-download"
    >
      Download for {os === 'mac' ? 'macOS' : 'Windows'}
    </a>
  );
}
```

## Need to split Mac Silicon vs Intel?
If you want to provide both the Apple Silicon (`arm64`) and Intel (`x64`) versions for Mac users:
1. `navigator.userAgentData.getHighEntropyValues(["architecture"])` can actively detect ARM vs x86 on modern Chromium browsers.
2. If `architecture` returns `arm`, you can filter the GitHub assets for `.dmg` AND `.includes('arm64')`.
3. Alternatively, you can render a simple dropdown on Mac devices providing "Download for Mac (Intel)" and "Download for Mac (Apple Silicon)" to let the user pick explicitly, similar to VS Code's download page.
