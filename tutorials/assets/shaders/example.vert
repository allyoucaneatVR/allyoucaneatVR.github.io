attribute vec3 aVertexPosition;
attribute vec3 aVertexOffset;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;
uniform vec3 uAmbientColor;
uniform vec3 uPointLightingLocations[1];
uniform vec3 uPointLightingColors[1];
uniform float uLightIndex;
uniform vec3 uColor;

varying vec3 vLightWeighting;
varying vec4 vColor;

void main(void) {
	vec4 position = uMVMatrix * vec4(aVertexPosition+aVertexOffset, 1.0);
	gl_Position = uPMatrix * position;
	
	vColor = vec4(uColor, 1.0); 
	
	vLightWeighting = uAmbientColor;
	vec3 transformedNormal = uNMatrix * aVertexNormal;
	vec3 normal = normalize(transformedNormal);
	vec3 eyeDirection = normalize(-position.xyz);
	
	if(uLightIndex-1.0>-0.01){
		vec3 lightDirection = normalize(uPointLightingLocations[0] - position.xyz);
		vec3 reflectionDirection = reflect(-lightDirection, normal);
		float diffuseLightWeighting = max(dot(normalize(transformedNormal), lightDirection), 0.0);
		vLightWeighting += uPointLightingColors[0] * diffuseLightWeighting;
	}
}