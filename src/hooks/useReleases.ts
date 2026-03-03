import { useState, useEffect } from 'react';

export interface GitHubAsset {
    name: string;
    browser_download_url: string;
    content_type: string;
    size: number;
}

export interface GitHubRelease {
    id: number;
    tag_name: string;
    name: string;
    body: string;
    published_at: string;
    html_url: string;
    assets: GitHubAsset[];
}

export function useReleases() {
    const [releases, setReleases] = useState<GitHubRelease[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [os, setOs] = useState<'mac' | 'win' | 'other'>('other');

    useEffect(() => {
        // Detect OS
        const platform = (window.navigator as any)?.userAgentData?.platform || window.navigator.platform;
        const ua = window.navigator.userAgent;

        let detectedOs: 'mac' | 'win' | 'other' = 'other';
        if (/Macintosh|Mac OS X/i.test(ua) || (typeof platform === 'string' && /Mac/i.test(platform))) {
            detectedOs = 'mac';
        } else if (/Windows/i.test(ua) || (typeof platform === 'string' && /Win/i.test(platform))) {
            detectedOs = 'win';
        }
        setOs(detectedOs);

        const fetchReleases = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/Xloudone/Xstudio-Releases/releases');
                if (!response.ok) {
                    throw new Error(`Failed to fetch releases: ${response.statusText}`);
                }
                const data = await response.json();
                setReleases(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, []);

    const latestRelease = releases.length > 0 ? releases[0] : null;

    const getLatestDownload = () => {
        if (!latestRelease) return null;
        const extension = os === 'mac' ? '.dmg' : '.exe';
        return latestRelease.assets.find(asset =>
            asset.name.endsWith(extension) && !asset.name.includes('blockmap')
        )?.browser_download_url || null;
    };

    return {
        releases,
        latestRelease,
        latestDownloadUrl: getLatestDownload(),
        os,
        loading,
        error
    };
}
