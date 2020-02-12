// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import {Controller} from "stimulus"

export default class extends Controller {
    static targets = ["output", "name"]

    addName(event) {
        var dataId = $('#id').attr('data-id');
        var data = this
        var request = $.ajax({
            type: "PUT",
            url: "/companies/" + dataId,
            dataType: 'JSON',
            data: {company: {name: this.nameTarget.value}},
            success(result) {
                data.outputTargets.forEach((target) => {
                    target.textContent = data.nameTarget.value
                    $('#company-name-input').attr('data-name', data.nameTarget.value)
                    $('#company-name-input').focus().blur();
                });

            },
            error(result) {
                return false;
            }
        })
    }
}
