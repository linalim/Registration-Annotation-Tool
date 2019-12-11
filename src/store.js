import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    imageData: [],
    allImages: [],
    allResults: [],
    imageResult: [],
    index: -1,
    tableKeys: [],
    ocr_result: '',
    DL_front_template: [],
    DL_back1_template: [],
    DL_back2_template: [],
    MN_front1_template: [],
    MN_back1_template: [],
    PP_front_template: [],
    PP_back_template: [],
    RC_front_template: [],
    RC_back_template: [],
    editedResult: {},
    editedKVPair: [],
    KVPair: [],
    id_type: '',
    new_id_type: '',
  },

  mutations: {

    /*
    * keep previous stored data for when the annotator leaves the app (thus done & next image not pressed)
    */
    // keepData(state, data) {


    // },

    showPreAnnotationImages(state) {
      let editedResults = [];
      let editedResultsName = [];

      axios.get('/OCRresults/')
      .then(response => {
        state.allResults = response.data;
      });

      axios.get('/editedResults/')
      .then(response => {
        editedResults = response.data;

        for (var i = 0; i < editedResults.length; i++) {
          var resultName = editedResults[i].replace('.json', '');
          editedResultsName.push(resultName);
        }

        axios.get('/images/')
        .then(response => {
          state.allImages = response.data;

          for (var i = 0; i < state.allImages.length; i++) {
            var imageName = state.allImages[i].replace('.jpg', '');

            if (!editedResultsName.includes(imageName)) {
              state.imageData.push(imageName+'.jpg');
            } 
          }

          state.imageResult = state.imageData[state.index].replace('.jpg', '.json');
          let fileExists = false;

          console.log("HERE: " + state.imageResult);
          console.log("THERE: " + state.allResults);

          for (var a = 0; a < state.allResults.length; a++) {
            if (state.imageResult == state.allResults[a]) {
              fileExists = true;
            }
          }

          console.log("file exists? : " + fileExists);

          if (fileExists) {
            axios.get('OCRresults/' + state.imageResult)
            .then(response => {
              state.ocr_result = response.data;

              state.id_type = state.ocr_result["id_type"];

              while(state.tableKeys.length) {
                state.tableKeys.pop();
              }

              for (var i = 0; i < state.ocr_result["ocr"].length; i++) {
                let result_key = state.ocr_result["ocr"][i]["key"]
                let result_word = state.ocr_result["ocr"][i]["word"]
                state.tableKeys.push({ name: result_key, value: result_word });
              }
            })
            .catch((err) => {
              console.log('no such image');
            })
          } else {

            state.id_type = '';

            while (state.tableKeys.length) {
              state.tableKeys.pop();
            }
            state.tableKeys = [];
          }

        });

      });

    },

    postMethod(state) {
      axios.post('http://localhost:3000/editedResults/', {
        body: state.editedResult
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    },

    saveNewTableData(state, data) {
      let table_data = data;
      let id_type = state.new_id_type;

      state.editedResult={};

      state.editedResult["id_type"] = id_type;
      state.editedKVPair = [];

      for (var i = 0; i < table_data.length; i++) {
        state.editedKVPair.push({ "key" : table_data[i]["name"], "word" : table_data[i]["value"] });
      }
      state.editedResult["ocr"] = state.editedKVPair;

    },


    saveTableData(state, data) {
      let table_data = data;

      state.editedResult = state.ocr_result;
      state.KVPair = [];

      for (var i = 0; i < table_data.length; i++) {
        state.KVPair.push( {"key" : table_data[i]["name"], "word" : table_data[i]["value"] });
      }
      state.editedResult["ocr"] = state.KVPair;
      
    },

    // getTableKeys(state) {

    //   axios.get('/OCRresults/')
    //   .then(response => {
    //     state.allResults = response.data;
    //   });

    //   axios.get('/images/')
    //   .then(response => {
    //     state.imageResult = state.imageData[state.index].replace('.jpg', '.json');
    //     let fileExists = false;

    //     console.log("HERE: " + state.imageResult);
    //     console.log("THERE: " + state.allResults);

    //     for (var a = 0; a < state.allResults.length; a++) {
    //       if (state.imageResult == state.allResults[a]) {
    //         fileExists = true;
    //       }
    //     }

    //     console.log("file exists? : " + fileExists);

    //     if (fileExists) {
    //       axios.get('OCRresults/' + state.imageResult)
    //       .then(response => {
    //         state.ocr_result = response.data;

    //         state.id_type = state.ocr_result["id_type"];

    //         while(state.tableKeys.length) {
    //           state.tableKeys.pop();
    //         }

    //         for (var i = 0; i < state.ocr_result["ocr"].length; i++) {
    //           let result_key = state.ocr_result["ocr"][i]["key"]
    //           let result_word = state.ocr_result["ocr"][i]["word"]
    //           state.tableKeys.push({ name: result_key, value: result_word });
    //         }
    //       })
    //       .catch((err) => {
    //         console.log('no such image');
    //       })
    //     } else {

    //       state.id_type = '';

    //       while (state.tableKeys.length) {
    //         state.tableKeys.pop();
    //       }
    //       state.tableKeys = [];
    //     }

    //   })

    // },

    // getTableKeys(state) {

    //   axios.get('/OCRresults/')
    //   .then(response => {
    //     state.imageResult = response.data;

    //     axios.get('OCRresults/' + state.imageResult[state.index])
    //     .then(response => {
    //       state.ocr_result = response.data;

    //       // while(state.id_type.length) {
    //       //   state.id_type.pop();
    //       // }

    //       // state.id_type.push(state.ocr_result["id_type"]);
    //       state.id_type = state.ocr_result["id_type"];

    //       while(state.tableKeys.length) {
    //         state.tableKeys.pop();
    //       }

    //       for (var i = 0; i < state.ocr_result["ocr"].length; i++) {
    //         let result_key = state.ocr_result["ocr"][i]["key"]
    //         let result_word = state.ocr_result["ocr"][i]["word"]
    //         state.tableKeys.push({ name: result_key, value: result_word });
    //       }
    //     })
    //     .catch((err) => {

    //     })

    //   })
    // },

    getDLtemplate(state) {
      axios.get('/templates/DL.json')
      .then(response => {
        let template = response.data;

        while(state.DL_front_template.length) {
            state.DL_front_template.pop();
        }
        
        for (var i = 0; i < template["fields"].length; i++) {
          state.DL_front_template.push({ name: template["fields"][i]["key"], value: "" });
        }
      })
      .catch((err) => {

      })
    },

    getDLBack1template(state) {
      axios.get('/templates/DL_back1.json')
      .then(response => {
        let template = response.data;

        while(state.DL_back1_template.length) {
            state.DL_back1_template.pop();
        }

        for (var i = 0; i < template["fields"].length; i++) {
          state.DL_back1_template.push({ name: template["fields"][i]["key"], value: "" });
        }
      })
      .catch((err) => {

      })
    },

    getDLBack2template(state) {
      axios.get('/templates/DL_back2.json')
      .then(response => {
        let template = response.data;

        while(state.DL_back2_template.length) {
            state.DL_back2_template.pop();
        }
        
        for (var i = 0; i < template["fields"].length; i++) {
          state.DL_back2_template.push({ name: template["fields"][i]["key"], value: "" });
        }
      })
      .catch((err) => {

      })
    },

    getMNBack1template(state) {
      axios.get('/templates/MN_back1.json')
      .then(response => {
        let template = response.data;

        while(state.MN_back1_template.length) {
            state.MN_back1_template.pop();
        }
        
        for (var i = 0; i < template["fields"].length; i++) {
          state.MN_back1_template.push({ name: template["fields"][i]["key"], value: "" });
        }
      })
      .catch((err) => {

      })
    },

    getMNFront1template(state) {
      axios.get('/templates/MN1.json')
      .then(response => {
        let template = response.data;

        while(state.MN_front1_template.length) {
            state.MN_front1_template.pop();
        }
        
        for (var i = 0; i < template["fields"].length; i++) {
          state.MN_front1_template.push({ name: template["fields"][i]["key"], value: "" });
        }
      })
      .catch((err) => {

      })
    },

    getPPBacktemplate(state) {
      axios.get('/templates/PP_back.json')
      .then(response => {
        let template = response.data;

        while(state.PP_back_template.length) {
            state.PP_back_template.pop();
        }
        
        for (var i = 0; i < template["fields"].length; i++) {
          state.PP_back_template.push({ name: template["fields"][i]["key"], value: "" });
        }
      })
      .catch((err) => {

      })
    },

    getPPFronttemplate(state) {
      axios.get('/templates/PP_front.json')
      .then(response => {
        let template = response.data;

        while(state.PP_front_template.length) {
            state.PP_front_template.pop();
        }
        
        for (var i = 0; i < template["fields"].length; i++) {
          state.PP_front_template.push({ name: template["fields"][i]["key"], value: "" });
        }
      })
      .catch((err) => {

      })
    },

    getRCBacktemplate(state) {
      axios.get('/templates/RC_back.json')
      .then(response => {
        let template = response.data;

        while(state.RC_back_template.length) {
            state.RC_back_template.pop();
        }
        
        for (var i = 0; i < template["fields"].length; i++) {
          state.RC_back_template.push({ name: template["fields"][i]["key"], value: "" });
        }
      })
      .catch((err) => {

      })
    },

    getRCFronttemplate(state) {
      axios.get('/templates/RC_front.json')
      .then(response => {
        let template = response.data;

        while(state.RC_front_template.length) {
            state.RC_front_template.pop();
        }
        
        for (var i = 0; i < template["fields"].length; i++) {
          state.RC_front_template.push({ name: template["fields"][i]["key"], value: "" });
        }
      })
      .catch((err) => {

      })
    },

    // getAllImages(state) {
    //   axios.get('/images/')
    //   .then(response => {
    //     state.imageData = response.data;
    //   })
    // },

    // getAllResults(state) {
    //   axios.get('/OCRresults/')
    //   .then(response => {
    //     state.allResults = response.data;
    //   })
    // },

    updateIndex(state) {
      state.index += 1;
      console.log("index: " + state.index);
    },
  },

  actions: {

  }
})