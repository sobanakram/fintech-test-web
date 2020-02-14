import { Controller } from "stimulus"
import { getMetaValue } from "@rails/activestorage/src/helpers";

export default class extends Controller {
  //Convention to follow for output tags. Name of input field+ "Output"
  static targets = ["nameOutput", "name"]

  onChange(event) {

    let key = event.target.dataset.target.split(".")[1];
    let dataId = this.data.element.dataset.id;
    let companyData = {};
    let ref = this;
    companyData[key] = this[key + "Target"].value;
    this.saveRecord(dataId, companyData)
      .then(response => {
        if (response.status == 422)
          throw response;
        else
          return response.json()
      })
      .then(function (response) {
        if (response) {
          if (!ref.data.element.dataset.id)
            $(ref.element).attr('data-id', response.id);
          ref[key + "OutputTargets"].forEach((target) => {
            target.textContent = ref[key + "Target"].value;
            $(event.target).attr('data-name', ref[key + "Target"].value).focus().blur();
          });
        }
      }).catch((error) => {
      error.json().then(errorMessages => {
        errorMessages.forEach((message) => {
          $.notify(message, "error");
        })
      })
    });
  }

  saveRecord = (dataId, companyData) => fetch(dataId ? "/companies/" + dataId + ".json" : "/companies.json",
    {
      method: dataId ? 'PUT' : 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        "X-CSRF-Token": getMetaValue("csrf-token")
      }),
      body: JSON.stringify(companyData),
    });

}
