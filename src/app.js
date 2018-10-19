new Vue({
    el: '#vue-container',
    data: {
        songs: [],
        notes: [],
        list: true
    },
    methods: {
        createSong: function() {
            this.songs.push({
                title: "title",
                genre: "genre"
            })
        },
        createNote: function() {
            this.notes.push({
                timestamp: "Time",
                text: "Text",
                labels: "Label, Label",
            })
        },
        deleteNote: function(index) {
            this.notes.splice(index, 1);
        }
    }
});

