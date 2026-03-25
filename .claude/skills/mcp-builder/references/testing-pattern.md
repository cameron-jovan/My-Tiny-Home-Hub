# FastMCP Server Testing Pattern

Reference pattern for testing a FastMCP server. Claude should generate a tailored
test script based on the server being tested.

## Async Test Client (Stdio)

```python
import asyncio
from fastmcp import Client

async def test_server(server_path):
    async with Client(server_path) as client:
        # List capabilities
        tools = await client.list_tools()
        print(f"Found {len(tools)} tools")
        for tool in tools:
            print(f"  - {tool.name}: {tool.description[:60]}...")

        resources = await client.list_resources()
        print(f"Found {len(resources)} resources")
        for resource in resources:
            desc = resource.description[:60] if resource.description else "No description"
            print(f"  - {resource.uri}: {desc}...")

        prompts = await client.list_prompts()
        print(f"Found {len(prompts)} prompts")

        # Call first tool with empty args (may fail if required params)
        if tools:
            try:
                result = await client.call_tool(tools[0].name, {})
                print(f"Tool '{tools[0].name}' returned: {str(result.data)[:100]}...")
            except Exception as e:
                print(f"Tool call failed (may need params): {e}")

        # Read first resource
        if resources:
            try:
                data = await client.read_resource(resources[0].uri)
                print(f"Resource read: {str(data)[:100]}...")
            except Exception as e:
                print(f"Resource read failed: {e}")

asyncio.run(test_server("server.py"))
```

## HTTP Transport Testing

For HTTP servers, start the server in the background first:

```python
async def test_http_server(port=8000):
    url = f"http://localhost:{port}/mcp"
    async with Client(url) as client:
        # Same test logic as stdio
        tools = await client.list_tools()
        ...
```

Start the server separately:
```bash
python server.py --transport http --port 8000 &
SERVER_PID=$!
sleep 2  # Wait for server startup

# Run tests
python test_script.py

# Cleanup
kill $SERVER_PID
```

## FastMCP Dev Mode

For development with auto-reload:

```bash
fastmcp dev server.py
fastmcp dev server.py --with-editable .
```

## MCP Inspector

Interactive testing via browser:

```bash
fastmcp dev server.py  # Opens inspector at http://localhost:5173
```
