#!/usr/bin/env python3
"""
Sync env vars to Render apexflash-APP service.
SSOT: C:\\Users\\erik_\\Box\\08_OPERATIONS\\8.1_ApexFlash_Bot\\.env.apexflash-app

Usage: python sync_render_app_env.py
"""
import json
import os
import urllib.request

RENDER_API_KEY = os.getenv("RENDER_API_KEY", "rnd_F6SnsNvz5CKtds7WZ3EGwp9xlDGZ")
SERVICE_ID = "srv-d6k5voh5pdvs73dsru5g"  # apexflash-APP
API = f"https://api.render.com/v1/services/{SERVICE_ID}/env-vars"
HDR = {
    "Authorization": f"Bearer {RENDER_API_KEY}",
    "Accept": "application/json",
    "Content-Type": "application/json",
}

ENV_FILE = os.path.expanduser(
    r"~/Box/08_OPERATIONS/8.1_ApexFlash_Bot/.env.apexflash-app"
)


def load_env(path: str) -> dict:
    env = {}
    with open(path, "r") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                k, v = line.split("=", 1)
                k, v = k.strip(), v.strip()
                if k:
                    env[k] = v
    return env


def sync():
    if not os.path.exists(ENV_FILE):
        print(f"ERROR: env file not found: {ENV_FILE}")
        return

    env = load_env(ENV_FILE)
    print(f"Loaded {len(env)} keys from {ENV_FILE}")

    payload = json.dumps([{"key": k, "value": v} for k, v in env.items()]).encode()
    req = urllib.request.Request(API, data=payload, headers=HDR, method="PUT")
    with urllib.request.urlopen(req) as r:
        result = json.loads(r.read())
    print(f"Render PUT: {len(result)} keys written to apexflash-APP service")
    print("DONE")


if __name__ == "__main__":
    sync()
