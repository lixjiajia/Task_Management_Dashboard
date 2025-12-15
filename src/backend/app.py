from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_graphql import GraphQLView
from schema import schema

app = Flask(__name__)


CORS(
    app,
    origins=["http://localhost:5173"],
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
    app.run(debug=True, port=5001)
