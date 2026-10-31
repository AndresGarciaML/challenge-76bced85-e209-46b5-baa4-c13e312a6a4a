import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  standalone: false
})
export class CartComponent implements OnInit {

  counter: number = 0;

  ngOnInit() {
    const cartItems = localStorage.getItem('cart');
    if (cartItems) {
      this.counter = parseInt(cartItems) || 0;
    }
  }

  addToCart() {
    const currentItemsCount: number = localStorage.getItem('cart') ? parseInt(localStorage.getItem('cart') || '0') : 0;
    const newItemsCount: number = currentItemsCount + 1;
    localStorage.setItem('cart', JSON.stringify(newItemsCount));
    this.counter = newItemsCount;
  }
}