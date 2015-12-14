function titleScreen(canvas, click){
    var scene = new Ayce.Scene(canvas);
    var camera = scene.getCamera();

    var webVRSuccess;
    if(click){
        click.onclick = function () {
            if(webVRSuccess === undefined){
                camera.getManager().clearModifiers();
                webVRSuccess = scene.useWebVR();
            }
            if(webVRSuccess){
                camera.setFullscreen(!camera.isFullscreen(), canvas);
                scene.resize();
            }
        };
    }

    var light = new Ayce.Light();
    light.position.y = 1;
    light.position.z = 10;
    scene.addToScene(light);

    var titleScene = new Ayce.OBJLoader("obj/title.obj");

    var balloon = new Ayce.OBJLoader("obj/balloon.obj")[0];
    var colors = [
        [244/255,67/255,54/255,1],  // red
        [233/255,30/255,99/255,1],  // pink
        [156/255,39/255,176/255,1], // purple
        [103/255,58/255,183/255,1], // deep purple
        [63/255,81/255,181/255,1],  // indigo
        [33/255,150/255,243/255,1], // blue
        [3/255,169/255,244/255,1],  // light blue
        [0/255,188/255,212/255,1],  // cyan
        [0/255,150/255,136/255,1],  // teal
        [76/255,175/255,80/255,1],  // green
        [139/255,195/255,74/255,1], // light green
        [205/255,220/255,57/255,1], // lime
        [255/255,235/255,59/255,1], // yellow
        [255/255,193/255,7/255,1],  // amber
        [255/255,152/255,0/255,1],  // orange
        [255/255,87/255,34/255,1]   // deep orange
    ];
    var balloonColors = [];
    for(i=0;i<colors.length;i++){
        balloonColors[i] = [];
        for(var j=0;j<balloon.colors.length/4;j++){
            balloonColors[i] = balloonColors[i].concat(colors[i]);
        }
    }

    var balloons = new Ayce.ParticleSystem(scene, balloon, 30, 100000);
    for(var i=0; i<balloons.particles.length; i++){
        balloons.particles[i].position = new Ayce.Vector3(
            (Math.random()-0.5)*18, -5, -2-Math.random()*6
        );
        balloons.particles[i].gravity = 0.000000001;
        balloons.particles[i].gravityExponent = 1.5;
        balloons.particles[i].scale = new Ayce.Vector3(.3,.3,.3);
        balloons.particles[i].lifetime = 10000+Math.random()*5000;
        balloons.particles[i].rotationAngle.y = Math.random()*0.001;
        balloons.particles[i].colors = balloonColors[Math.round(Math.random()*balloonColors.length-1)];
    }
    balloons.initParticleArrays();
    balloons.useFragmentLighting = false;
    scene.addToScene(balloons);

    var text = titleScene.Text;
    text.position.z = -5;
    scene.addToScene(text);

    var cube = new Ayce.Geometry.Box(1, 1, 1);
    cube.offset.set(-cube.a/2.0, -cube.b/2.0, -cube.c/2.0);
    cube = cube.getO3D();
    cube.indices.reverse();
    cube.colors = [];
    for(var i=0; i/4 < cube.vertices.length/3; i+=4){
        cube.colors[i+0] = Math.random();
        cube.colors[i+1] = Math.random();
        cube.colors[i+2] = Math.random();
        cube.colors[i+3] = 1;
    }
    cube.scale.set(100, 100, 100);
    scene.addToScene(cube);

    function update(){
        scene.updateScene();
        scene.drawScene();
        Ayce.requestAnimFrame(update);
    }

    update();
}

function tutorial1(canvas){
    var scene = new Ayce.Scene(canvas);

    var cube = new Ayce.Geometry.Box(1, 1, 1);
    cube.offset.set(-cube.a/2.0, -cube.b/2.0, -cube.c/2.0);
    cube = cube.getO3D();
    cube.position.z = -2;
    scene.addToScene(cube);

    function update(){
        var time = Date.now();
        time = (time/2000)%Math.PI*2.0;
        cube.rotation.fromEulerAngles(0, time, 0);

        Ayce.requestAnimFrame(update);
        scene.updateScene();
        scene.drawScene();
    }

    update();
}

function tutorial2(canvas){
    var scene = new Ayce.Scene(canvas);
    scene.setClearColor(0.2, 0.2, 0.35);
    scene.setAmbientLight(0.6, 0.8, 0.6);

    var light = new Ayce.Light();
    light.position.set(1, 0, 2);
    light.color.red = 1.0;
    light.color.green = 0.0;
    light.color.blue = 1.0;
    scene.addToScene(light);

    var light2 = new Ayce.Light();
    light2.position.set(-1, 0, 2);
    light2.color.red = 1.0;
    light2.color.green = 1.0;
    light2.color.blue = 0.0;
    scene.addToScene(light2);

    var cube = new Ayce.Geometry.Box(1, 1, 1);
    cube.offset.set(-cube.a / 2.0, -cube.b / 2.0, -cube.c / 2.0);
    cube = cube.getO3D();
    cube.position.z = -2;
    scene.addToScene(cube);

    var counter = 0;
    var index = 1;

    function update() {
        counter++;
        if (counter > 250) {
            if (index === 0){
                scene.setRendererDesktop();
                document.getElementById("render-type").innerHTML = "Desktop";
            }
            if (index === 1){
                scene.setRendererVR(false);
                document.getElementById("render-type").innerHTML = "VR";
            }
            if (index === 2){
                scene.setRendererVR(true);
                document.getElementById("render-type").innerHTML = "VR Distorted";
            }
            index++;
            if (index >= 3) index = 0;
            counter = 0;
        }
        var time = Date.now();
        time = (time / 2000) % Math.PI * 2.0;
        cube.rotation.fromEulerAngles(0, time, 0);
        Ayce.requestAnimFrame(update);
        scene.updateScene();
        scene.drawScene();
    }

    update();
}

function tutorial3(canvas){
    var scene = new Ayce.Scene(canvas);
    scene.setClearColor(0.2, 0.2, 0.35);
    scene.setAmbientLight(0.9, 0.9, 0.9);

    var light = new Ayce.Light();
    light.position.set(0, 1, 2);
    scene.addToScene(light);

    //Adding objects to the scene
    var o3Ds = new Ayce.OBJLoader("obj/suzanne.obj");
    var suzanne = o3Ds["Suzanne"];
    var plane = o3Ds["Plane"];

    suzanne.position.z = -4;
    suzanne.useSpecularLighting = true;
    suzanne.shininess = 10;

    scene.addToScene(suzanne);
    scene.addToScene(plane);

    //Getting the camera manager
    var cameraManager = scene.getCamera().getManager();

    //creating a custom camera modifier
    var myModifier = new Ayce.CameraModifier();
    cameraManager.modifiers.push(myModifier);

    //creating a mouse/keyboard camera modifier
    var mouseKeyboard = new Ayce.MouseKeyboard(canvas, canvas);
    cameraManager.modifiers.push(mouseKeyboard);


    function update() {
        //Check if the mouse is locked
        if(!mouseKeyboard.isMouseLocked()){
            //Setting the position of the custom modifier
            myModifier.position.y = 1+Math.sin(Date.now()/1000)/2;
        }
        Ayce.requestAnimFrame(update);
        scene.updateScene();
        scene.drawScene();
    }

    update();
}

function tutorial4(canvas){
    var scene = new Ayce.Scene(canvas);
    scene.setClearColor(0.2, 0.2, 0.35);

    var light = new Ayce.Light();
    light.position.set(0, 1, 2);
    scene.addToScene(light);

    var cube = new Ayce.OBJLoader("obj/cube.obj");
    cube = cube[0];
    cube.position.set(1, 0, -2);
    cube.scale.set(0.9, 0.9, 0.9);
    cube.imageSrc = "obj/textures/cube2.png";
    cube.transparent = true;
    cube.twoFaceTransparency = true;

    var axis = new Ayce.Vector3(1, 1, 0);
    cube.onUpdate = function(){
        var r = (Date.now() / 2000) % Math.PI * 2.0;
        cube.rotation.fromAxisAngle(axis, -r);
    };
    scene.addToScene(cube);

    var cube2 = new Ayce.OBJLoader("obj/cube.obj");
    cube2 = cube2[0];
    cube2.position.set(-1, 0, -2);
    cube2.scale.set(0.9, 0.9, 0.9);
    cube2.useFragmentLighting = true;
    cube2.useSpecularLighting = true;
    cube2.shininess = 4.0;
    cube2.imageSrc = "obj/textures/cube.png";
    cube2.normalMap = "obj/textures/cube_normal.png";

    var axis = new Ayce.Vector3(1, 1, 0);
    cube2.onUpdate = function(){
        var r = (Date.now() / 2000) % Math.PI * 2.0;
        cube2.rotation.fromAxisAngle(axis, -r);
    };
    scene.addToScene(cube2);

    function update() {
        Ayce.requestAnimFrame(update);
        scene.updateScene();
        scene.drawScene();
    }

    update();
}

function tutorial5(canvas){
    var scene = new Ayce.Scene(canvas);
    scene.setClearColor(0.2, 0.2, 0.35);

    var light = new Ayce.Light();
    light.position.set(0, 1, 2);
    scene.addToScene(light);

    var cube = new Ayce.Geometry.Box(1, 1, 1);
    cube.offset.set(-cube.a/2, -cube.b/2, -cube.c/2);
    cube = cube.getO3D();
    cube.position.z = -2;

    cube.shader = "shaders/example";
    var offset = [];
    for(var i=0; i < cube.vertices.length; i++){
        offset[i] = 0.1 - Math.random()/5;
    }
    cube.addShaderAttribute("aVertexOffset", 3, offset);

    var color = {
        red: 0.5,
        green: 0.0,
        blue: 0.1
    };
    cube.addShaderUniform("uColor", "uniform3f", color, ["red", "green", "blue"]);

    scene.addToScene(cube);

    function update() {
        cube.rotation.fromEulerAngles(0, Date.now()/1000, 0);
        color.red   = ( Math.sin(Date.now()/1000                    ) + 1)/4;
        color.green = ( Math.sin(Date.now()/1000 + (Math.PI*2*(1/3))) + 1)/4;
        color.blue  = ( Math.sin(Date.now()/1000 + (Math.PI*2*(2/3))) + 1)/4;

        Ayce.requestAnimFrame(update);
        scene.updateScene();
        scene.drawScene();
    }

    update();
}

function makeRequest(url, element, afterLoad) {
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest)return;
    
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
              element.innerHTML = httpRequest.responseText;
              if(afterLoad)afterLoad();
          } else {
            console.warn('XMLHttpRequest problem.');
          }
        }
    };
    httpRequest.open('GET', url);
    httpRequest.send();
}