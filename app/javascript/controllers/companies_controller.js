// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import {Controller} from "stimulus"
import {getMetaValue} from "@rails/activestorage/src/helpers";

export default class extends Controller {
    static targets = ["output", "name"]

    addName(event) {
        let dataId = this.data.element.dataset.id;
        let companyData = {name: this.nameTarget.value};
        let ref = this
        this.UpdateRecord(dataId, companyData)
            .then(function (response) {
                if (response.status == 200) {
                    ref.outputTargets.forEach((target) => {
                        target.textContent = ref.nameTarget.value
                        $('#company-name-input').attr('data-name', ref.nameTarget.value)
                        $('#company-name-input').focus().blur();
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
