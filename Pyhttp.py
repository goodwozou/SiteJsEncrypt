from flask import Flask
from flask_cors import CORS
import json
app = Flask(__name__)
cors = CORS(app)
dictPath = "dict.txt"

@app.route('/dict', methods=['GET', 'POST'])
def retPass():
    fp = open(dictPath, "r", encoding="utf-8")
    ps = fp.readlines()
    ps = json.dumps(ps)
    return ps.strip("[").strip("]")

if __name__ == '__main__':
    app.debug = True
    app.run()
