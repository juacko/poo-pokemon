const iPokemon = require('./ipokemon');
const Pokemon = require('./pokemon');

class JosuePokemon extends Pokemon {
  constructor(nombre, ataque, defensa, hp, tipo) {
      super(nombre, ataque, defensa, hp, tipo);
  }

  getGolpeCritico() {
      return this.ataque * 1.75;
  }

  aumentaDefensa(incremento) {
      this.defensa += incremento;
  }

  reduceDefensa(decremento) {
      this.defensa -= decremento;
  }

  aumentaHp(incremento) {
      this.hp += incremento;
  }

  reduceHp(decremento) {
      this.hp -= decremento;
  }

  atacar(enemigo) {
      let danio = this.ataque;
      let multiplicador = 1;

      if (this.tipo === 'Electrico' && enemigo.getTipo() === 'Agua') {
          multiplicador = 2; // Fuerte contra Agua
      } else if (this.tipo === 'Fuego' && enemigo.getTipo() === 'Planta') {
          multiplicador = 2; // Fuerte contra Planta
      } else if (this.tipo === 'Agua' && enemigo.getTipo() === 'Fuego') {
          multiplicador = 2; // Fuerte contra Fuego
      } else if (this.tipo === 'Planta' && enemigo.getTipo() === 'Electrico') {
          multiplicador = 2; // Fuerte contra Electrico
      } else if (this.tipo === 'Agua' && enemigo.getTipo() === 'Planta') {
          multiplicador = 0.5; // Débil contra Planta
      } else if (this.tipo === 'Fuego' && enemigo.getTipo() === 'Agua') {
          multiplicador = 0.5; // Débil contra Agua
      } else if (this.tipo === 'Planta' && enemigo.getTipo() === 'Fuego') {
          multiplicador = 0.5; // Débil contra Fuego
      } else if (this.tipo === 'Electrico' && enemigo.getTipo() === 'Planta') {
          multiplicador = 0.5; // Débil contra Planta
      }

      if (Math.random() < 0.25) { // 25% de probabilidad de golpe crítico
          danio = this.getGolpeCritico();
          console.log(`¡${this.nombre} ha realizado un golpe crítico!`);
      }

      danio *= multiplicador;
      enemigo.reduceHp(danio);
      console.log(`${this.nombre} ha atacado a ${enemigo.getNombre()} y le ha quitado ${danio} puntos de vida.`);
      if (multiplicador > 1) {
          console.log(`¡${this.nombre} es fuerte contra ${enemigo.getNombre()}!`);
      } else if (multiplicador < 1) {
          console.log(`¡${this.nombre} es débil contra ${enemigo.getNombre()}!`);
      }
  }
}

class BatallaPokemon {
  constructor(pokemon1, pokemon2) {
      this.pokemon1 = pokemon1;
      this.pokemon2 = pokemon2;
  }

  iniciarBatalla() {
      console.log(`¡Comienza la batalla entre ${this.pokemon1.getNombre()} del tipo ${this.pokemon1.getTipo()} y ${this.pokemon2.getNombre()} del tipo ${this.pokemon2.getTipo()}!`);

      let turno = 1;
      while (this.pokemon1.getHP() > 0 && this.pokemon2.getHP() > 0) {
          console.log(`Turno ${turno}`);
          if (turno % 2 !== 0) { //turno impar
              this.pokemon1.atacar(this.pokemon2);
          } else { //turno par
              this.pokemon2.atacar(this.pokemon1);
          }
          turno++;
      }

      if (this.pokemon1.getHP() <= 0) {
          console.log(`¡${this.pokemon2.getNombre()} ha ganado la batalla!`);
          this.pokemon2.aumentarExperiencia(50); //gana experiencia
          console.log(`${this.pokemon2.getNombre()} ha ganado ${this.pokemon2.getExperiencia()} puntos de experiencia`);
      } else {
          console.log(`¡${this.pokemon1.getNombre()} ha ganado la batalla!`);
          this.pokemon1.aumentarExperiencia(50); //gana experiencia
          console.log(`${this.pokemon1.getNombre()} ha ganado ${this.pokemon1.getExperiencia()} puntos de experiencia`);
      }
  }
}

const pikachu = new JosuePokemon("Pikachu", 90, 50, 100,"Electrico");
const charmander = new JosuePokemon("bulbasaur", 85, 40, 400,"planta");

const batalla = new BatallaPokemon(pikachu, charmander);
batalla.iniciarBatalla();