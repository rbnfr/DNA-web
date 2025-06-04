# DNA-web
DNA conversion web interface.

## How it works?
1. Generate random DNA sequence with the dedicated button or paste your own sequence. It works with lowercase characters and spaces.
2. Select the desired translation.
3. Select if you want to introduce random modifications and it's frequency.
4. Click translate button to show the results.

## Running the app

Run the bundled Python server and open the page it serves. This single command
hosts the static files **and** the API, so you don't need to run any other web
server. If port `8000` is taken you can pass a different port number or set
`PORT`:

```bash
# default port 8000
python3 server.py

# or choose a port
python3 server.py 8080
# or PORT=8080 python3 server.py
```

Then browse to `http://localhost:<port>/Index.html` using the same port number.
