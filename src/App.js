import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import $ from 'jquery';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import AboutPage from './components/AboutPage.jsx';
import { build_dictionary, clean_input, response_user, response_bot, get_time } from './functions.js';
import * as brain from 'brain.js'; // Import the entire module

import './App.css';
import logobot from './bot.png';


// get data
const trainingPhrases = require('./data/data-patterns.json');
const data_responses = require('./data/data-responses.json');

// build dictionary
const dictionary = build_dictionary(trainingPhrases);

// prepare your training data
const trainingSet = trainingPhrases.map(dataSet => {
  const encodedValue = encode(dataSet.phrase)
  return { input: encodedValue, output: dataSet.result }
});

// train neural network
const model_network = new brain.NeuralNetwork();
model_network.train(trainingSet);

// encoding text to number format
function encode(phrase) {
  const phraseTokens = phrase.split(' ')
  const encodedPhrase = dictionary.map(word => phraseTokens.includes(word) ? 1 : 0)

  return encodedPhrase;
}

// component function
function App() {
  // make a prediction
  function predict_bot(txt_chat_input) {
    // encode input text
    const encoded = encode(clean_input(txt_chat_input))
    // predict the response
    const json_output = model_network.run(encoded);
    console.log("Max Categories: " + Object.values(json_output).length + " intents.");
    console.log(json_output);
    // get max value using apply
    const max = Math.max.apply(null, Object.values(json_output));
    const index = Object.values(json_output).indexOf(max);
    // get probability and pred_label
    const pred_label = Object.keys(json_output)[index];
    const pred_prob = json_output['' + pred_label];
    var pred_response = "";
    for (var no in data_responses) {
      if (data_responses[no]['' + pred_label] != null) {
        pred_response = data_responses[no]['' + pred_label];
      }
    }
    console.log('Predicted label (' + pred_label + '), probability (' + pred_prob + ').');
    return [pred_response, pred_prob];
  }

  // compile/execute chatbot
  function run_chatbot() {
    var input_chat = $('#input-chat').val(); // get input chat
    if (input_chat.length === 0) {
      alert("Sorry, write your text chat first.");
    } else {
      $("#content-chat-feed").append(response_user(input_chat, get_time(new Date)));
      force_scroll_bottom();

      // predict response chatbot
      const [respond_bot, prob_bot] = predict_bot(input_chat);
      const prob_val = (parseFloat(prob_bot) * 100).toFixed(2);

      console.log('Response: ' + respond_bot);

      const threshold = 75;
      if (prob_val > threshold) {
        $("#content-chat-feed").append(response_bot(respond_bot, prob_val, get_time(new Date)));
      } else {
        $("#content-chat-feed").append(response_bot("Maaf, saya masih bodoh. Saya belum mengerti.", prob_val, get_time(new Date)));
      }
      // scroll bottom
      force_scroll_bottom();
      // set empty input
      $('#input-chat').val('');
    }
  }

  // Force scrollbar to bottom
  function force_scroll_bottom() {
    const el = document.getElementById('content-chat-feed');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  // handle button function
  const handleButtonSend = () => {
    // compile chatbot brain.js
    run_chatbot();
  }

  // pressing Enter key
  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // compile chatbot brain.js
      run_chatbot();
    }
  }

   return (
    <Router>
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3">
              <Sidebar />
            </div>

            {/* Main Content */}
            <div className="col-md-9">
              <div className="card d-flex flex-column vh-100 overflow-hidden">
                <Routes>
                  <Route path="/about" element={<AboutPage />} />
                  <Route
                    path="/"
                    element={
                      <>
                        <Header />
                        <div className="card-body" style={{ overflowY: "scroll", flex: 1 }} id="content-chat-feed">
                          <div className="containerbot">
                            <img src={logobot} alt="Avatar" style={{ width: "100%" }} />
                            <div className="row">
                              <div className="col-sm-8 pt-4">Haiiiiii!!!!</div>
                              <div className="col-sm-4 pt-2"><span className="time-right">98.99%<br />11:00 PM</span></div>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer">
                          <div className="input-group">
                            <input type="text" className="form-control" id="input-chat" onKeyDown={_handleKeyDown} />
                            <div className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{ backgroundColor: "#a569bd", borderColor: "#a569bd" }}
                                onClick={handleButtonSend}
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;