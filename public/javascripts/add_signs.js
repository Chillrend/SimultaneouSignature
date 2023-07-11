const hidden_serializer = document.getElementById('serialized_signature');

const options = {
    // In this demo we focus on graphics-related options.
    // See https://luis.leiva.name/jsketch/js/docs/$.fn.sketchable.defaults.html for more configurable options.
    graphics: {
        firstPointSize: 0,
        lineWidth: 3,
        strokeStyle: 'black',
    }
};
const sketcher = new Sketchable(document.getElementById('signature'), options);

document.getElementById('clear').addEventListener('click', function(evt) {
    evt.preventDefault();
    sketcher.clear();
});

document.getElementById('undo').addEventListener('click', function(evt) {
    evt.preventDefault();
    sketcher.memento.undo();
});

document.getElementById('redo').addEventListener('click', function(evt) {
    evt.preventDefault();
    sketcher.memento.redo();
});

document.getElementById('submit-signature').addEventListener('click', function(evt) {
    evt.preventDefault();

    hidden_serializer.value = sketcher.serializer.save();

    document.getElementById('signature_form').submit();
});