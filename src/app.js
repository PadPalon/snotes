let noteRow = {
    props: ["note"],
    template: `
        <tr>
            <td>{{ note.timestamp }}</td>
            <td>{{ note.text }}</td>
            <td>{{ note.labels }}</td>
            <td class="icon_column"><i v-on:click="$parent.$emit('note-removed', note)" class="fas fa-trash-alt"></i></td>
        </tr>`
};

let app = new Vue({
    el: '#vue-container',
    data: {
        songs: [],
        notes: [],
        currentSong: {
            id: 0,
            title: "",
            genre: ""
        },
        songCount: 1,
        noteCount: 1,
        list: true
    },
    methods: {
        newSong: function() {
            this.list = false;
            this.currentSong = {
                id: 0,
                title: "",
                genre: ""
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
        createNote: function () {
            this.notes.push({
                id: this.noteCount,
                timestamp: "",
                text: "",
                labels: "",
            });
            this.noteCount++;
        }
    },
    components: {
        "note-row": noteRow
    }
});

app.$on("note-removed", function(note) {
   app.notes.splice(app.notes.indexOf(note), 1);
});

app.$on("song-removed", function(song) {
   app.songs.splice(app.songs.indexOf(song), 1);
});