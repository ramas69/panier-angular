import { Component, OnInit } from '@angular/core';
import { IProduit } from '../IProduit';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produits:IProduit[]=[];
  commandes:IProduit[]=[];
  resultat :number = 0;

  constructor(private service:ProduitService){}

  ngOnInit(): void {
      this.getProduit();
  }


// recuperer les produits
  getProduit(){
    this.produits= this.service.fetchAll()
    return this.produits
  }

  //ajout article dans le panier avec la quantité
  ajouterPanier(index: number) {
   this.service.addPanier(index);
    this.commandes = this.service.commande
    console.log(this.commandes);
    
  }


  //incrementation quantité  produit
  addQuantity(index:number){
    this.produits[index].quantite++;
  }

  // decrementation quantité produit
  deleteQuantity(index:number){
    this.produits[index].quantite--;
  // pour ne pas desecndre en dessous de 0
    if(this.produits[index].quantite<0){
        this.produits[index].quantite=0;
      }
  
   
  }


  deletePoduit(index:number){
    this.service.deletePanier(index);
    this.commandes = this.service.commande
  }


  Total(index:number){
    return this.commandes[index].quantite*this.commandes[index].prixHT;

  }

  calculerTotal(): number {
    return this.commandes.reduce((acc, commande) => acc + Number(commande.prixHT) * commande.quantite, 0);
  }
  
  calculerQte(): number {
    return this.commandes.reduce((acc, commande) => acc + commande.quantite, 0);
  }

  supprimePanier(){
    this.commandes = [];
  }


}
