from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_graphql import GraphQLView
from schema import schema
import os

app = Flask(__name__)


CORS(
    app,
    origins=[os.environ.get(
    "CORS_ORIGINS",
    "http://localhost:5173,https://task-management-dashboard-tawny.vercel.app"
    ).split(",")],
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=True,
    methods=["GET", "POST", "OPTIONS"]
)

@app.route("/")
def home():
    return "<h3> Flask GraphQL API is running — visit /graphql</h3>"

@app.route("/graphql", methods=["OPTIONS"])
def graphql_options():
    """Handle preflight requests explicitly"""
    response = app.make_default_options_response()
    headers = response.headers

    headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"

    return response

# --- GraphQL endpoint itself ---
app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view(
        "graphql",
        schema=schema,
        graphiql=True
    ),
    methods=["GET", "POST", "OPTIONS"]
)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=False, host="0.0.0.0", port=port)
