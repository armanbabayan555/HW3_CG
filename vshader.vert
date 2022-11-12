#version 330 core
layout(location = 0) in vec3 position;

out vec3 interNormal;
out vec3 interPosition;

uniform int part;
uniform vec4 objectColor;
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;


void main() {
    interPosition = vec3(model * vec4(position, 1.0));
    gl_Position = projection * view * vec4(interPosition, 1.0);

    vec3 normDir;
    if (part == 1) {
        normDir = vec3(0.0, -1.0, 0.0);
    }
    else if (part == 2) {
        normDir = position - vec3(0.0, position.y, 0.0);
    }
    else if (part == 3) {
        normDir = vec3(0.0, 1.0, 0.0);
    }

    interNormal = transpose(inverse(mat3(model))) * normDir;

}