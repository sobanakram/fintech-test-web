import { Controller } from "stimulus"
import { getMetaValue } from "@rails/activestorage/src/helpers";

export default class extends Controller {
  //Convention to follow for output tags. Name of input field+ "Output"
  static targets = ["nameOutput", "name"]

  onChange(event) {

    let key = event.target.dataset.target.split(".")[1];
    let dataId = this.data.element.dataset.id;
    let companyData = {};
    companyData[key] = this[key + "Target"].value
    // this.constructor.targets.forEach((key)=>{
    //     if(this[key+"Target"].dataset.isInput === "true")
    //         companyData[key] = this[key+"Target"].value
    // });
    console.log(companyData);
    let ref = this;
    this.UpdateRecord(dataId, companyData)
      .then(function (response) {
        if (response.status === 200) {
          ref[key + "OutputTargets"].forEach((target) => {
            target.textContent = ref[key + "Target"].value;
            $(event.target).attr('data-name', ref[key + "Target"].value).focus().blur();
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  UpdateRecord(dataId, companyData) {
    let response = fetch("/companies/" + dataId, {
      method: 'PUT',
      credentials: 'include',
      dataType: 'JSON',
      headers: new Headers({
        'Content-Type': 'application/json',
        "X-CSRF-Token": getMetaValue("csrf-token")
      }),
      body: JSON.stringify(companyData),
    });
    return response;
  }
}
