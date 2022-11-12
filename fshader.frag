#version 330 core
uniform vec4 objectColor;

in vec3 interNormal;
in vec3 interPosition;
out vec4 color;

uniform float Ka;
uniform float Kd;
uniform float Ks;
uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;
uniform vec3 lightPosition;
uniform vec3 viewDirection;

void main(){
    vec3 Ia = Ka * ambientColor;
    vec3 lightDir = normalize(lightPosition - interPosition);
    float lambertian = max(dot(lightDir, normalize(interNormal)), 0.0);
    vec3 Id = Kd * lambertian * diffuseColor;
    float spec = 0.0;
    vec3 Is = vec3(0.0);
    if(lambertian > 0.0) {
      vec3 reflection = reflect(-lightDir, interNormal);
      vec3 view = normalize(viewDirection - interPosition);
      float specAngle = max(dot(reflection, view), 0.0);
      Is = Ks * pow(specAngle, 120.f) * specularColor;
    }
    
    color = normalize(vec4(Ia + Id + Is, 1.0) * objectColor);
}