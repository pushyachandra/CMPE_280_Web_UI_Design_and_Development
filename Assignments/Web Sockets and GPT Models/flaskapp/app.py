# app.py
from flask import Flask, render_template, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/run_socket_client', methods=['POST'])
def run_socket_client():
    try:
        result = subprocess.check_output(["python", "socket/socketclient.py"])
        output = result.decode("utf-8")
        successful_responses = 0
        failed_responses = 0
        
        # Parse the output to determine successful and failed responses
        for line in output.split('\n'):
            if "Received:" in line:
                if "Hello world!" in line:
                    successful_responses += 1
                else:
                    failed_responses += 1
        
        response_data = {
            "result": output,
            "successful_responses": successful_responses,
            "failed_responses": failed_responses
        }
        return jsonify(response_data)
    except subprocess.CalledProcessError as e:
        return jsonify(error=str(e), successful_responses=0, failed_responses=0)

if __name__ == '__main__':
    app.run(debug=True)
