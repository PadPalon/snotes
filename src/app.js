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

let app = new Vue({
    el: '#vue-container',
    data: {
        songs: [],
        currentSong: {
            id: 0,
            title: "",
            genre: "",
            notes: [],
            noteCount: 1
        },
        songCount: 1,
        list: true
    },
    methods: {
        newSong: function() {
            this.list = false;
            this.currentSong = {
                id: 0,
                title: "",
                genre: "",
                notes: [],
                noteCount: 1
            }
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
            this.currentSong.notes.push({
                id: this.currentSong.noteCount,
                timestamp: "",
                text: "",
                labels: "",
                notes: []
            });
            this.currentSong.noteCount++;
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