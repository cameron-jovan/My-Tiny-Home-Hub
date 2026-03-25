# FastMCP Cloud Pre-Deploy Checklist

Work through these checks before deploying to FastMCP Cloud. Fix errors before deploying;
warnings are advisory.

## Required Checks (errors)

### 1. Server file exists
Verify the main server file exists at the expected path.

### 2. Python syntax valid
```bash
python3 -m py_compile server.py
```

### 3. Module-level server object
The server instance must be at module level (not inside a function):

```python
# CORRECT — Cloud can find this
mcp = FastMCP("My Server")

# WRONG — Cloud can't discover the server
def create_server():
    mcp = FastMCP("My Server")
    return mcp
```

Check: `grep -q "^mcp = FastMCP\|^server = FastMCP\|^app = FastMCP" server.py`

### 4. requirements.txt exists
Must exist and contain only PyPI packages (no `git+`, `-e`, `.whl`, `.tar.gz`).

### 5. No hardcoded secrets
Check for `api_key = "..."` or `password = "..."` patterns (excluding `os.getenv`/`os.environ`):

```bash
grep -i 'api_key\s*=\s*["\x27]' server.py | grep -v 'os.getenv\|os.environ'
grep -i 'password\s*=\s*["\x27]\|secret\s*=\s*["\x27]' server.py | grep -v 'os.getenv\|os.environ'
```

Use `os.getenv()` for all secrets.

## Advisory Checks (warnings)

### 6. fastmcp in requirements.txt
Should be listed as a dependency.

### 7. .gitignore includes .env
Prevent accidental secret commits.

### 8. No circular imports
Check for `from __init__ import` or `from . import.*get_` patterns.

### 9. Git repository initialised
Should have a remote configured for Cloud deployment.

### 10. Server can load
```bash
timeout 5 python3 server.py --help
# or
timeout 5 fastmcp inspect server.py
```

## Deploy

Once all checks pass:

```bash
git add . && git commit -m "Ready for deployment"
git push -u origin main
# Then: visit https://fastmcp.cloud, connect repo, add env vars, deploy
```
