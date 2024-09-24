class Pokemon {
  constructor(nombre, ataque, defensa, hp, tipo) {
      this.nombre = nombre;
      this.ataque = ataque;
      this.defensa = defensa;
      this.hp = hp;
      this.tipo = tipo;
      this.experiencia = 0;
  }

  getNombre() {
      return this.nombre;
  }

  getAtaque() {
      return this.ataque;
  }

  getDefensa() {
      return this.defensa;
  }

  getHP() {
      return this.hp;
  }

  getTipo() {
      return this.tipo;
  }

  getExperiencia() {
      return this.experiencia;
  }

  setNombre(nombre) {
      this.nombre = nombre;
  }

  setAtaque(ataque) {
      this.ataque = ataque;
  }

  setDefensa(defensa) {
      this.defensa = defensa;
  }

  setHP(hp) {
      this.hp = hp;
  }

  setTipo(tipo) {
      this.tipo = tipo;
  }

  aumentarExperiencia(cantidad) {
      this.experiencia += cantidad;
      this.actualizarEstadisticas();
  }

  actualizarEstadisticas() {
      if (this.experiencia >= 100) {
          this.ataque += 10;
          this.defensa += 5;
          this.hp += 20;
          this.experiencia -= 100;
          console.log(`¡${this.nombre} ha subido de nivel! Sus estadísticas han aumentado.`);
      }
  }
}

module.exports = Pokemon;