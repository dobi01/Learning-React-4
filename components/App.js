var GIPHY_PUB_KEY = 'wpbYZjx0GlwdUx9q1iRnKUc23QOcLRSD';
var GIPHY_API_URL = 'https://api.giphy.com';

App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },

  handleSearch: function(searchingText) {  // 1.
    this.setState({
      loading: true  // 2.
    });
    this.getGif(searchingText, function(gif) {  // 3.
      this.setState({  // 4
        loading: false,  // a
        gif: gif,  // b
        searchingText: searchingText  // c
      });
    }.bind(this));
  },

  getGif: function(searchingText, callback) {  // 1.
    var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
    var xhr = new XMLHttpRequest();  // 3.
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText).data; // 4.
        var gif = {  // 5.
          url: data.fixed_width_downsampled_url,
          sourceUrl: data.url
        };
        callback(gif);  // 6.
      }
    };
    xhr.send();
  },

  render: function() {

    var styles = {
      margin: '100px auto',
      textAlign: 'center',
      width: '90%'
    };

    return (
      <div style={styles}>
        <h1>Giphy GIF search!</h1>
        <p>Find a GIF at <a href='http://giphy.com'>Giphy</a>. Press enter to show next GIFs.</p>
        <Search onSearch={this.handleSearch}/>
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});
