function init() {
    /*Load up view with Vue*/
    w2g = new Vue({
        el: '#w2g',
        data: {
            peerid: "",
            connections: []
        }
    })
    console.log("vue initialised");

    /* Start PeerJS*/
    peer = new Peer({ key: '00pbw9bq1jb81tt9' });
    peer.on('open', function(id) {
        console.log('peerjs initialised, id is ' + id);
        w2g.peerid = id;
    });

    /* start webtorrent*/
    client = new WebTorrent()

    /* Prevent form submission when a video is dragged into the box and add a callback when one is */
    $('.box').on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
        })
        .on('drop', function(e) {
            launchStream(e.originalEvent.dataTransfer.files[0]);
        });

    /*On new connection add to connections list*/
    peer.on('connection', function(conn) {
    	conn.on('data', readMessage(data))
        w2g.connections.append(conn);
        conn.send({'type':'initMagnet','data':torrent.magnetURI});

    });

    $('#joinForm').on('submit', join(e))

}

function launchStream(file) {

    torrent = client.seed(file, [function onseed(torrent) {}])
    $('#fileForm').css("display","none");
    $('#startMessage').css("display","none");
    $('#readyMessage').css("display","block")
}

function readMessage(data){
	if(data.type=='initMagnet'){

	}
	if(data.type=='pause'){

	}
	if(data.type=='play'){

	}
	if(data.type=='progress'){

	}
}

function join(e){
	 e.preventDefault();
     e.stopPropagation();
     friendCon = peer.connect(
     	$('#friendID').value();
     );
     
}