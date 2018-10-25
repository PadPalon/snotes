let noteRow = {
    props: ["note"],
    template: `
        <tr>
            <td><input type="text" class="pure-input-1" placeholder="Timestamp" v-model="note.timestamp"/></td>
            <td><input type="text" class="pure-input-1" placeholder="Text" v-model="note.text"/></td>
            <td><input type="text" class="pure-input-1" placeholder="Labels" v-model="note.labels"/></td>
            <td class="icon_column"><i v-on:click="$parent.$emit('note-removed', note)" class="fas fa-trash-alt"></i></td>
        </tr>`
};

class Song {
    constructor() {
        this.id = 0;
        this.title = "";
        this.genre = "";
        this.notes = [];
    }

    createNote() {
        this.notes.push(new Note(this));
    }
}

class Note {
    constructor(song) {
        this.id = song.notes.length + 1;
        this.timestamp = "";
        this.text = "";
        this.labels = "";
    }
}

let app = new Vue({
    el: '#vue-container',
    data: {
        songs: [],
        currentSong: null,
        songCount: 1,
        list: true
    },
    methods: {
        newSong: function() {
            this.list = false;
            this.currentSong = new Song();
        },
        saveSong: function () {
            if(this.currentSong.id === 0) {
                this.currentSong.id = this.songCount;
                this.songs.push(this.currentSong);
                this.songCount++;
            } else {
                let song = this.songs.find(e => e.id === this.currentSong.id);
                song.title = this.currentSong.title;
                song.genre = this.currentSong.genre;
            }
        },
        editSong: function (song) {
            this.list = false;
            this.currentSong = song;
        },
        toList: function (song) {
            this.list = true;
            this.currentSong = null;
        },
        createNote: function () {
            this.saveSong();
            this.currentSong.createNote();
        }
    },
    components: {
        "note-row": noteRow
    }
});

app.$on("note-removed", function(note) {
   app.currentSong.notes.splice(app.currentSong.notes.indexOf(note), 1);
});

app.$on("song-removed", function(song) {
   app.songs.splice(app.songs.indexOf(song), 1);
});