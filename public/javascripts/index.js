fetch('/signs/all')
    .then(response => response.json())
    .then((guests) => {
        getSignOneByOne(guests);
    });

async function getSignOneByOne (guests){
    console.log(`Size left: ${guests.length}`);

    if(guests.length === 0) return;

    let guests_not_signed = [...guests];

    setTimeout(function () {

        guests_not_signed.forEach(async (item, index, object) => {
            await fetch(`/signs/${item._id}`)
                .then(response => response.json())
                .then(sign => {
                    console.log(sign);
                    if(sign.signature !== ""){
                        const canvas_component = document.getElementById(`sign-${item._id}`)
                        drawSignature(canvas_component, sign.signature);
                        object.splice(index, 1);
                    }
                });

            getSignOneByOne(guests_not_signed)
        });
    }, 3000)


}

function drawSignature(components, signature_json){

}