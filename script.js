const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d'); /* определяем контекст рисования, связанный с холстом - двумерный контекст*/
const borderSize = 5;
canvas.width = window.innerWidth - (borderSize * 2);
canvas.height = window.innerHeight - (borderSize * 31);

//ctx.strokeStyle = '#BADA55'; /*задает цвет или стиль, используемый при выполнении обводки фигур */
ctx.lineJoin = 'round'; /*определяет форму вершин в которых линии сходятся - "round" - скругляет углы*/
ctx.lineCap = 'round'; /*определяет, как будут выглядеть концы нарисованных линий - "round" - концы линий скругленные */
//ctx.lineWidth = 50; /*задает толщину линий в пикселах */
//ctx.globalCompositeOperation = 'multiply'; /**устанавливает/возвращает то, как исходное (новое) изображение нарисовано на целевом (существующем) изображении. */

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down
  console.log(e);
 
  ctx.beginPath(); /* начинает контур или сбрасывает текущий контур */
  // start from
  ctx.moveTo(lastX, lastY); /*перемещает начальную точку нового фрагмента контура в координаты (x, y) */
  // go to
  ctx.lineTo(e.offsetX, e.offsetY); /*метод CanvasRenderingContext2D, добавляет линию к текущему под пути с конечной точкой с короординатами (x, y).
  Сам метод ничего , он лишь добавляет подпуть к текущему пути, предоствляя его таким методам, как fill() и stroke(), отрисовывающим сам путь. */
  ctx.stroke();  /*обводит текущий или данный контур цветом strokeStyle */
  [lastX, lastY] = [e.offsetX, e.offsetY];

}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Панель управления
const brushSlider = document.querySelector('#lineWidth') 
ctx.lineWidth = brushSlider.value;
brushSlider.addEventListener("change", function () {
  ctx.lineWidth = brushSlider.value;
});
  
const colorPicker = document.querySelector('#base') 
ctx.strokeStyle = colorPicker.value;
colorPicker.addEventListener("change", function () {
  ctx.strokeStyle = colorPicker.value;
});



canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);