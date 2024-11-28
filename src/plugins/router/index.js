import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default function (app) {
  app.use(router)
}
export { router }

export function disabilitaEventiDevTools() {
  const disableEvent = (e) => {
    try {
      if (e.stopPropagation) {
          e.stopPropagation();
      } else if (window.event) {
          window.event.cancelBubble = true;
      }
    } catch (ex) { }
    e.preventDefault();
    return false;
  };

  // Blocca F12 e altre combinazioni per DevTools
  const blockDevTools = (e) => {
    
    var booleanMac = undefined;
    var booleanFun = undefined;
    var booleanShortcut = undefined;

    try {
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
      booleanMac = ((e.key == 'S' || e.keyCode == 83) && (isMac ? e.metaKey : e.ctrlKey)); // Cmd/Ctrl+S
      //console.log("booleanMac 1: " , booleanMac);
    } catch (exMac) { }
    if (booleanMac === undefined) { //se sopra va in eccezione, ci riprovo in altra maniera
      try {
        // "S" key + macOS
        booleanMac = (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)); // Cmd/Ctrl+S
        //console.log("booleanMac 2: " , booleanMac);
      } catch (exMac) { }
    }
    try {
      booleanFun = (e.key == 'F12' || e.keyCode == 123); // Blocca F12
      //console.log("booleanFun: " , booleanFun);
    } catch (exFun) { }
    try {
      booleanShortcut = (e.ctrlKey && e.shiftKey && ((e.key == 'I' || e.key == 'J') || (e.keyCode == 73 || e.keyCode == 74) )) || // Ctrl+Shift+I/J
                        (e.ctrlKey && (e.key == 'U' || e.keyCode == 85));// Ctrl+U
      //console.log("booleanShortcut: " , booleanShortcut);
    } catch (exShort) { }
    
    if ( booleanFun == true || booleanShortcut == true || booleanMac == true ) {
      disableEvent(e);
    }
  };
  
  // tasto destro
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); }, false);

  // Aggiungi listener per bloccare eventi indesiderati (es F12)
  document.addEventListener('keydown', blockDevTools, false);

}
