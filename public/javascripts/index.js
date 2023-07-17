const canvas_components = document.getElementsByTagName('canvas');
const canvases = Array.prototype.slice.call(canvas_components);

const options = {
    // See https://luis.leiva.name/jsketch/js/docs/$.fn.sketchable.defaults.html for more configurable options.
    interactive: false,
    graphics: {
        firstPointSize: 0,
        lineWidth: 3,
        strokeStyle: 'black',
    }
};

const refreshButton = document.getElementById('refresh_btn');
refreshButton.addEventListener('click', renderSignature)

function renderSignature(){
    canvases.forEach((canvas, index, canvases) => {
        const components_id = canvas.getAttribute('id');
        const id_array = components_id.split('-');
        const id = id_array[1];

        console.log('id: ' + id);

        getSignature(id)
            .then((signature_json) => {
                if(signature_json.signature !== ""){
                    const signature = JSON.parse(signature_json.signature);
                    const sketcher = new Sketchable(canvas, options).strokes(signature.strokes).clear(true).animate.strokes();
                }
            });
    })
}

async function getSignature(id){
    return await fetch(`/signs/${id}`)
        .then(response => response.json())
}

renderSignature();