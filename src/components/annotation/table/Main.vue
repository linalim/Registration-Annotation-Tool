<template>
  <v-layout column>

    <v-container fluid>
      <v-row align="center">
          <v-subheader>Registration Type</v-subheader>

        <v-col cols="9">
          <v-select
            :items="items"
            item-text="state"
            :label="this.$store.state.id_type"
            return-object
            single-line
            v-on:change="changeFormat"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-data-table
      :headers="headers"
      :items="key"
      :items-per-page="20"
    >
      <template v-slot:item.value="props">
        <v-edit-dialog
          :return-value.sync="props.item.value"
        > {{ props.item.value }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.value"
              label="Edit"
              single-line
              counter
              v-on:change="makeEdits"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>

    <v-flex style="margin: 10px">
      <v-layout>
        <v-spacer />

          <div>
            <v-btn depressed color="primary" @click="getImageandResults">Done & Next Image</v-btn>
          </div>

      </v-layout>
    </v-flex>

  </v-layout>
</template>

<script>

export default {

  data() {
    return {
      select: this.$store.state.id_type,
      items: [
        { state: 'JP_DRIVER_LICENSE_BACK_TYPE1' },
        { state: 'JP_DRIVER_LICENSE_BACK_TYPE2' },
        { state: 'JP_DRIVER_LICENSE_FRONT' },
        { state: 'JP_MY_NUMBER_CARD_BACK_TYPE1' },
        { state: 'JP_MY_NUMBER_CARD_FRONT_TYPE1' },
        { state: 'JP_PASSPORT_BACK' },
        { state: 'JP_PASSPORT_FRONT' },
        { state: 'JP_RESIDENCE_CARD_BACK' },
        { state: 'JP_RESIDENCE_CARD_FRONT' },
      ],
      pagination: {},
      headers: [
        {
          text: 'Key',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Value',
          value: 'value',
        }
      ],
      key: this.$store.state.tableKeys,
      formatChanged: false

    }
  },
  methods: {
    getImageandResults,
    changeFormat(format) {
      this.formatChanged = true;

      this.$store.state.new_id_type = format.state;

      if (format.state == 'JP_DRIVER_LICENSE_FRONT') {
        this.$store.commit('getDLtemplate')
        this.key = this.$store.state.DL_front_template
      }
      else if (format.state == 'JP_DRIVER_LICENSE_BACK_TYPE1') {
        this.$store.commit('getDLBack1template')
        this.key = this.$store.state.DL_back1_template
      }
      else if (format.state == 'JP_DRIVER_LICENSE_BACK_TYPE2') {
        this.$store.commit('getDLBack2template')
        this.key = this.$store.state.DL_back2_template
      }
      else if (format.state == 'JP_MY_NUMBER_CARD_BACK_TYPE1') {
        this.$store.commit('getMNBack1template')
        this.key = this.$store.state.MN_back1_template
      }
      else if (format.state == 'JP_MY_NUMBER_CARD_FRONT_TYPE1') {
        this.$store.commit('getMNFront1template')
        this.key = this.$store.state.MN_front1_template
      }
      else if (format.state == 'JP_PASSPORT_BACK') {
        this.$store.commit('getPPBacktemplate')
        this.key = this.$store.state.PP_back_template
      }
      else if (format.state == 'JP_PASSPORT_FRONT') {
        this.$store.commit('getPPFronttemplate')
        this.key = this.$store.state.PP_front_template
      }
      else if (format.state == 'JP_RESIDENCE_CARD_BACK') {
        this.$store.commit('getRCBacktemplate')
        this.key = this.$store.state.RC_back_template
      }
      else if (format.state == 'JP_RESIDENCE_CARD_FRONT') {
        this.$store.commit('getRCFronttemplate')
        this.key = this.$store.state.RC_front_template
      }
    },

    makeEdits(edits) {
      this.key.value = edits;
    }

  }

}

function getImageandResults () {
  this.$store.commit('showPreAnnotationImages')
  // this.$store.commit('getAllImages')
  // this.$store.commit('getAllResults')
  this.$store.commit('updateIndex')
  // this.$store.commit('getTableKeys')

  console.log("ocr result exists when back?: " + this.$store.state.ocr_result);

  if (this.$store.state.allResults) {
    if (!this.formatChanged){
      this.$store.commit('saveTableData', this.key);
    }
    else if (this.formatChanged) {
      this.$store.commit('saveNewTableData', this.key);
      this.formatChanged = false;
      this.key = this.$store.state.tableKeys;
      // this.select = this.$store.state.id_type;
    }
    this.$store.commit('postMethod')
  }  

}

</script>
