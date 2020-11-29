import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { Layout, SubHeader } from 'components'

import Wrapper from 'components/Wrapper/Wrapper'
import { SomosClient } from 'utils'
import Image from 'components/Image/Image'
import { Link } from 'react-router-dom'
import { Grid, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import { isEmptyArray } from 'utils/array'

const cliente = new SomosClient()

const styles = () => ({
  inputSearch: {
    display: 'flex',
    flex: 1,
    padding: '10px 20px',
    margin: '20px 0px',
  },
  form: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  artistName: {
    fontSize: 18,
    color: '#607d8b',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  artistPhoto: {
    display: 'block',
    marginBottom: 10,
    width: 200,
    height: 200,
    borderRadius: '100%',
    margin: '0 auto',
  },
  artistLink: {
    textDecoration: 'none',
  },
  paper: {
    padding: 16,
  },
})

class Search extends Component {
  state = {
    artists: [],
  }

  componentDidMount() {
    this.fetchArtists('ed')
  }

  handleChangeSearch = ({ target: { value: search } }) => {
    if (search && search.length > 4) {
      this.fetchArtists(search)
    }
  }

  fetchArtists = async search => {
    const {
      data: {
        artists: { items },
      },
    } = await cliente.getArtists({ q: search, type: 'artist' })

    this.setState({ artists: items })
  }

  render() {
    const { classes } = this.props
    const { artists } = this.state

    return (
      <Layout>
        <SubHeader
          breadcrumb={[{ text: 'Busca' }]}
          heading="Somos Front-end Challange"
        />
        <Wrapper>
          <form action="" className={classes.form}>
            <input
              className={classes.inputSearch}
              type="search"
              name="search"
              placeholder="Buscar Artistas"
              onChange={this.handleChangeSearch}
              required
            />
          </form>

          <Grid container spacing={2}>
            {!isEmptyArray(artists) &&
              artists.map(artist => (
                <Grid item xs={12} sm={6} md={4}>
                  <Link
                    to={`/artista/${artist.id}`}
                    className={classes.artistLink}
                  >
                    <Paper className={classes.paper}>
                      <Image
                        src={artist.images[1] ? artist.images[1].url : null}
                        alt={artist.name}
                        className={classes.artistPhoto}
                      />
                      <p className={classes.artistName}>{artist.name}</p>
                    </Paper>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Wrapper>
      </Layout>
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object,
}

Search.defaultProps = {
  classes: null,
}

export default withStyles(styles)(Search)
