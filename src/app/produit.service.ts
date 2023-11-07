import { Injectable } from '@angular/core';
import { mock } from './mock';
import { IProduit } from './IProduit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  commande:any[]=[];
  produits:IProduit[]=mock;

  constructor() { }

fetchAll(){
  return mock;
}

addPanier(index: number) {
  if (this.produits[index].quantite === 0) return;
  const produit: IProduit = { ...this.produits[index] };
  const produitExiste = this.commande.find((p) => p.nom === produit.nom);

  if (produitExiste) {
    const indexExistant = this.commande.findIndex((p) => p.nom === produit.nom);
    this.commande[indexExistant].quantite += produit.quantite;
  } else {
    this.commande.push(produit);
    console.log(this.commande);
    
  }

  this.produits[index].quantite = 0;

  
}

deletePanier(index: number) {
  this.commande.splice(index, 1);
}

addQuantite(){
  
}

}
