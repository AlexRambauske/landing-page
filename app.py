from flask import Flask, render_template


DOMAIN = "rambauske.dev"
SITE_URL = f"https://{DOMAIN}"

# Add future destinations here. The page layout is generated from this list.
DESTINATIONS = [
    {
        "title": "IB Manager",
        "subdomain": "ibmanager",
        "description": "Your classes, deadlines, and plans in one calm place.",
    },
    {
        "title": "Open WebUI",
        "subdomain": "openwebui",
        "description": "A quiet interface for local models and private experiments.",
    },
]


def create_app() -> Flask:
    app = Flask(__name__)

    @app.get("/")
    def index():
        destinations = [
            {
                **destination,
                "url": f"https://{destination['subdomain']}.{DOMAIN}",
            }
            for destination in DESTINATIONS
        ]
        return render_template(
            "index.html",
            destinations=destinations,
            site_url=SITE_URL,
        )

    return app


app = create_app()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
