<template>
  <div >


      <div v-for="i in arr" :key="i.id">
           {{i.Title}}
      </div>
      <button @click="get()">clica aqui porra</button>
      <button @click="add()">Adicionar</button>
      <button @click="edit()">Editar</button>
      <button @click="Delete()">Delete</button>
      <button @click="GetWithCamlQuery()">Caml</button>

      </div>
</template>

<script>
import axios from 'axios'
import { sp, ItemAddResult } from "@pnp/sp";

export default {
data:()=>{
    return{
      arr:''
    }
},
created(){
  //this.teste()
},
methods:{
    
    GetWithCamlQuery(){
        
    let xml = `<View><Query><Where><Eq><FieldRef Name="Title"/><Value Type="Text">123</Value></Eq></Where></Query></View>`

       sp.web.lists
     .getByTitle("Fornecedores")
    .getItemsByCAMLQuery({'ViewXml':xml})
     .then(items => {
      this.arr = items
     },
     (err) => {
       console.log(err);
     });
    },
 get(){
       sp.web.lists
     .getByTitle("Fornecedores")
     .select("Title, ID")
     .items.top(5000)
     .get()
     .then(items => {
      this.arr = items
     },
     (err) => {
       console.log(err);
     });
 },
 add(){
     sp.web.lists.getByTitle("Fornecedores").items.add({
        Title:"OIIII"
      }).then(() => {          

        alert("Item adicionado com Sucesso")
        teste()
      },
      (err) => {
        console.log(err);
        alert("Erro ")
      });
 },
 edit(){
      sp.web.lists.getByTitle("Fornecedores").items.getById(1).update({
           Title: "Fui editado",
     }).then(() => {          

        alert("Item editado com sucesso")
        
      },
      (err) => {
        console.log(err);
        alert("Erro ")
      });
      
 },
 Delete(){
      sp.web.lists.getByTitle("Fornecedores").items.getById(1).delete().then(() => {          

        alert("Item Apagado com sucesso")
        
      },
      (err) => {
        console.log(err);
        alert("Erro ")
      });
      
 }
    
}
}
</script>

<style>

</style>