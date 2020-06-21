import React, { useState, useMemo } from 'react';

import './styles.css';

import api from '../../services/api';
import camera from '../../assets/camera.svg';

function NewSpot({ history }) {
  const [price, setPrice] = useState('');
  const [techs, setTechs] = useState('');
  const [company, setCompany] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleOnSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append('price', price);
    data.append('techs', techs);
    data.append('company', company);
    data.append('thumbnail', thumbnail);

    const user_id = localStorage.getItem('user');

    await api.post('/spots', data, {
      headers: {
        user_id,
      },
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select Thumbnail" />
      </label>
      <label htmlFor="company">EMPRESA*</label>
      <input
        id="company"
        type="text"
        value={company}
        placeholder="sua empresa incrível"
        onChange={event => setCompany(event.target.value)}
      />
      <label htmlFor="company">TECNOLOGIAS* <span>(separadas por vírgula)</span></label>
      <input
        id="techs"
        type="text"
        value={techs}
        placeholder="quais tecnologias usam?"
        onChange={event => setTechs(event.target.value)}
      />
      <label htmlFor="company">VALOR DA DIÁRIA* <span>(em branco para gratuito)</span></label>
      <input
        id="price"
        type="text"
        value={price}
        placeholder="valor cobrado por dia"
        onChange={event => setPrice(event.target.value)}
      />
      <button
        type="submit"
        className="btn"
      >
        Cadastrar
      </button>
    </form>
  );
}

export default NewSpot;
