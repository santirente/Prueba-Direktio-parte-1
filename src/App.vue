<template>
  <section id="app">
    <nav class="navbar">
      <div class="field has-addons">
        <div class="control container-button">
          <button class="button is-info searh-button" @click="Search">
            Buscar Personaje
          </button>
        </div>
        <div class="control container-button">
          <button class="button is-danger delete-button" @click="Delete">
            Eliminar busqueda
          </button>
        </div>
      </div>
    </nav>
    <transition name="fade">
      <div class="modal-1" v-if="showModal">
        <h1>{{ character.name }}</h1>
        <table class="table table-striped table-bordered character-table">
          <thead>
            <tr>
              <th>Color</th>
              <th>Cumpleaños</th>
              <th>Color de ojos</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>Color de cabello</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center">
              <td>{{ character.skin_color }}</td>
              <td>{{ character.birth_year }}</td>
              <td>{{ character.eye_color }}</td>
              <td>{{ character.height }}</td>
              <td>{{ character.mass }}</td>
              <td>{{ character.hair_color }}</td>
            </tr>
          </tbody>
        </table>
        <button class="button is-info searh-button" @click="closeModal()">
          Cerrar
        </button>
      </div>
    </transition>
    <transition name="fade">
      <div class="modal-overlay" v-if="showModal"></div>
    </transition>
    <div class="container results">
      <h1 class="title">Listado de personajes</h1>
      <div class="container-button">
        <button
          class="button count-button searh-button"
          @click="CreateCharacter()"
        >
          <span class="is-size-7">
            Crear Personaje
          </span>
        </button>
      </div>
      <paginate ref="paginator" name="characters" :list="characters" :per="5">
        <table class="table table-striped table-bordered character-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Color</th>
              <th>Cumpleaños</th>
              <th>Detallar</th>
              <th>Eliminar</th>
              <th>Actualizar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in paginated('characters')" :key="c.id">
              <td>{{ c.name }}</td>
              <td>{{ c.skin_color }}</td>
              <td>{{ c.birth_year }}</td>
              <td>
                <button
                  class="button is-info searh-button"
                  @click="SearchCaracter(c.id)"
                >
                  Abrir
                </button>
              </td>
              <td>
                <button
                  class="button is-info delete-button"
                  @click="showAlert(c.id)"
                >
                  Eliminar
                </button>
              </td>
              <td>
                <button
                  class="button is-info update-button"
                  @click="checkForm(c.name, `Color de ojos: ${c.eye_color} --- Sexo: ${c.gender} --- Masa: ${c.mass}`)"
                >
                  Actualizar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </paginate>
      <paginate-links
        class="butoons-links"
        for="characters"
        :show-step-links="true"
        :simple="{
          prev: 'Anterior',
          next: 'Siguiente'
        }"
      ></paginate-links>
    </div>
    <div
      v-if="openEditCharacter"
      class="form-character container row"
    >
      <div class="form-group col-4">
        <p v-if="errors.length">
    <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
    <ul>
      <li v-for="error in errors" :key="error.id">{{ error }}</li>
    </ul>
  </p>
  </div>
<div class="form-group col-12">
  <p>
    <label for="description">Descripción</label>
    <input
      id="description"
      v-model="description"
      type="string"
      name="description"
      min="0"
      class="form-control">
  </p>
</div>
<div class="form-group col-6">
  <p>
    <label for="name">Nombre</label>
    <input
      id="name"
      v-model="name"
      type="string"
      name="name"
      min="0"
      class="form-control">
  </p>
</div>
<div class="form-group col-6">
  <p>
    <label for="name">Imagen</label>
    <input type="file" @change="previewFiles" multiple>
  </p>
</div>
  <p class="row">
    <input
      type="submit"
      class="form-control btn btn-primary submit col-12"
       @click="checkForm()"
    >
  </p>
    </div>
  </section>
</template>

<script>
import trackService from "./servicios/track";
export default {
  name: "app",
  data() {
    return {
      paginate: ["characters"],
      characters: [],
      showModal: false,
      openCreate: false,
      character: [],
      openEditCharacter: false,
      errors: [],
      movie: null,
      name :'',
      description:'',
      image : Object,
      newCharacter :{},
    };
  },
  methods: {
    Search() {
      var id = 0;
      trackService.search(this.searchQuery).then(res => {
        if(this.characters.length > 0){
          this.characters.push(res.results);
        }
        else{
          this.characters = res.results;
        }
        this.characters.forEach(element => {
          id++;
          element.id = id;
        });
      });
    },
    checkForm(name, description) {
      this.openEditCharacter = true;
      var id = 0;
      debugger;
      if (this.name && this.description) {
        this.newCharacter.name = this.name
        this.newCharacter.description = this.description
        this.characters.push( this.newCharacter);
        this.characters.forEach(element => {
          id++;
          element.id = id;
        });
        this.$toastr.success('Se creo existosamente al personaje','Exitoso')
      }
      console.log(name, description);
      if(name !== '' && description !== ''){
        this.name = name;
        this.description = description
         this.newCharacter.name = nombre
        this.newCharacter.description = description
      }

      this.errors = [];

      if (!this.newCharacter.name) {
        this.errors.push("El nombre es obligatorio.");
        this.$toastr.error('El nombre es obligatorio.','Error')
      }
      if (!this.newCharacter.description) {
        this.errors.push("La Descripcion es obligatoria.");
        this.$toastr.error('La Descripcion es obligatoria.','Error')
      }
    },
    previewFiles(event) {
      this.newCharacter.image = event.target.files;
   },
    showAlert(id) {
      console.log(id);
      this.$swal({
        title: "Confirmar",
        text: "¿Está seguro de eliminar la petición?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f90",
        cancelButtonColor: "#C5C5C5",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          this.characters.splice(id - 1, 1);
          this.$toastr.success("Se eliminio existosamenete el personaje");
        }
      });
    },
    closeModal() {
      this.showModal = false;
      this.character = [];
    },
    SearchCaracter(id) {
      (this.showModal = true),
        trackService.searchCarcater(this.searchQuery, id).then(res => {
          this.character = res;
          console.log(this.character);
        });
    },
    CreateCharacter() {
      this.openEditCharacter = true;
    },
    Delete() {
      this.characters = [];
    },
    UpdateCharacterInfo() {
      this.openEditCharacter = true;
    },
    changePage(page) {
      this.page = page <= 0 || page > this.pages ? this.page : page;
    }
  },
  computed: {}
};
</script>

<style lang="scss">
@import "scss/main.scss";
</style>
