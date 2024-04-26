function e(e,t,r,o){Object.defineProperty(e,t,{get:r,set:o,enumerable:!0,configurable:!0})}var t=globalThis.parcelRequire0da3,r=t.register;r("6B0gZ",function(t,r){e(t.exports,"color32BitToUniform",()=>o);function o(e,t,r){let o=(e>>24&255)/255;t[r++]=(255&e)/255*o,t[r++]=(e>>8&255)/255*o,t[r++]=(e>>16&255)/255*o,t[r++]=o}}),r("6qNFd",function(t,r){e(t.exports,"BatchableSprite",()=>o);class o{constructor(){this.vertexSize=4,this.indexSize=6,this.location=0,this.batcher=null,this.batch=null,this.roundPixels=0}get blendMode(){return this.renderable.groupBlendMode}packAttributes(e,t,r,o){let n=this.renderable,i=this.texture,a=n.groupTransform,l=a.a,u=a.b,s=a.c,c=a.d,m=a.tx,f=a.ty,x=this.bounds,v=x.maxX,p=x.minX,d=x.maxY,h=x.minY,g=i.uvs,b=n.groupColorAlpha,P=o<<16|65535&this.roundPixels;e[r+0]=l*p+s*h+m,e[r+1]=c*h+u*p+f,e[r+2]=g.x0,e[r+3]=g.y0,t[r+4]=b,t[r+5]=P,e[r+6]=l*v+s*h+m,e[r+7]=c*h+u*v+f,e[r+8]=g.x1,e[r+9]=g.y1,t[r+10]=b,t[r+11]=P,e[r+12]=l*v+s*d+m,e[r+13]=c*d+u*v+f,e[r+14]=g.x2,e[r+15]=g.y2,t[r+16]=b,t[r+17]=P,e[r+18]=l*p+s*d+m,e[r+19]=c*d+u*p+f,e[r+20]=g.x3,e[r+21]=g.y3,t[r+22]=b,t[r+23]=P}packIndex(e,t,r){e[t]=r+0,e[t+1]=r+1,e[t+2]=r+2,e[t+3]=r+0,e[t+4]=r+2,e[t+5]=r+3}reset(){this.renderable=null,this.texture=null,this.batcher=null,this.batch=null,this.bounds=null}}}),r("3JBHn",function(r,o){e(r.exports,"compileHighShaderGpuProgram",()=>s),e(r.exports,"compileHighShaderGlProgram",()=>c);var n=t("fK92B"),i=t("6j7wq"),a=t("i8pLT"),l=t("jOJh1"),u=t("8hMvn");function s({bits:e,name:t}){let r=(0,a.compileHighShader)({template:{fragment:l.fragmentGPUTemplate,vertex:l.vertexGPUTemplate},bits:[u.globalUniformsBit,...e]});return(0,i.GpuProgram).from({name:t,vertex:{source:r.vertex,entryPoint:"main"},fragment:{source:r.fragment,entryPoint:"main"}})}function c({bits:e,name:t}){return new n.GlProgram({name:t,...(0,a.compileHighShaderGl)({template:{vertex:l.vertexGlTemplate,fragment:l.fragmentGlTemplate},bits:[u.globalUniformsBitGl,...e]})})}}),r("i8pLT",function(r,o){e(r.exports,"compileHighShader",()=>f),e(r.exports,"compileHighShaderGl",()=>x);var n=t("9zLXd"),i=t("jJet4"),a=t("ak3Em"),l=t("9hCqF"),u=t("9Zsfg");let s=Object.create(null),c=new Map,m=0;function f({template:e,bits:t}){let r=v(e,t);if(s[r])return s[r];let{vertex:o,fragment:n}=function(e,t){let r=t.map(e=>e.vertex).filter(e=>!!e),o=t.map(e=>e.fragment).filter(e=>!!e),n=(0,a.compileInputs)(r,e.vertex,!0);return{vertex:n=(0,l.compileOutputs)(r,n),fragment:(0,a.compileInputs)(o,e.fragment,!0)}}(e,t);return s[r]=p(o,n,t),s[r]}function x({template:e,bits:t}){let r=v(e,t);return s[r]||(s[r]=p(e.vertex,e.fragment,t)),s[r]}function v(e,t){return t.map(e=>(c.has(e)||c.set(e,m++),c.get(e))).sort((e,t)=>e-t).join("-")+e.vertex+e.fragment}function p(e,t,r){let o=(0,i.compileHooks)(e),a=(0,i.compileHooks)(t);return r.forEach(e=>{(0,n.addBits)(e.vertex,o,e.name),(0,n.addBits)(e.fragment,a,e.name)}),{vertex:(0,u.injectBits)(e,o),fragment:(0,u.injectBits)(t,a)}}}),r("9zLXd",function(r,o){e(r.exports,"addBits",()=>i);var n=t("hUCK4");function i(e,t,r){if(e)for(let o in e){let i=t[o.toLocaleLowerCase()];if(i){let t=e[o];"header"===o&&(t=t.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"")),r&&i.push(`//----${r}----//`),i.push(t)}else(0,n.warn)(`${o} placement hook does not exist in shader`)}}}),r("jJet4",function(t,r){e(t.exports,"compileHooks",()=>n);let o=/\{\{(.*?)\}\}/g;function n(e){let t={};return(e.match(o)?.map(e=>e.replace(/[{()}]/g,""))??[]).forEach(e=>{t[e]=[]}),t}}),r("ak3Em",function(t,r){function o(e,t){let r;let o=/@in\s+([^;]+);/g;for(;null!==(r=o.exec(e));)t.push(r[1])}function n(e,t,r=!1){let n=[];o(t,n),e.forEach(e=>{e.header&&o(e.header,n)}),r&&n.sort();let i=n.map((e,t)=>`       @location(${t}) ${e},`).join("\n");return t.replace(/@in\s+[^;]+;\s*/g,"").replace("{{in}}",`
${i}
`)}e(t.exports,"compileInputs",()=>n)}),r("9hCqF",function(t,r){function o(e,t){let r;let o=/@out\s+([^;]+);/g;for(;null!==(r=o.exec(e));)t.push(r[1])}function n(e,t){let r=[];o(t,r),e.forEach(e=>{e.header&&o(e.header,r)});let n=0,i=r.sort().map(e=>e.indexOf("builtin")>-1?e:`@location(${n++}) ${e}`).join(",\n"),a=r.sort().map(e=>`       var ${e.replace(/@.*?\s+/g,"")};`).join("\n"),l=`return VSOutput(
                ${r.sort().map(e=>` ${function(e){let t=/\b(\w+)\s*:/g.exec(e);return t?t[1]:""}(e)}`).join(",\n")});`,u=t.replace(/@out\s+[^;]+;\s*/g,"");return(u=(u=u.replace("{{struct}}",`
${i}
`)).replace("{{start}}",`
${a}
`)).replace("{{return}}",`
${l}
`)}e(t.exports,"compileOutputs",()=>n)}),r("9Zsfg",function(t,r){e(t.exports,"injectBits",()=>o);function o(e,t){let r=e;for(let e in t){let o=t[e];r=o.join("\n").length?r.replace(`{{${e}}}`,`//-----${e} START-----//
${o.join("\n")}
//----${e} FINISH----//`):r.replace(`{{${e}}}`,"")}return r}}),r("jOJh1",function(t,r){e(t.exports,"vertexGPUTemplate",()=>o),e(t.exports,"fragmentGPUTemplate",()=>n),e(t.exports,"vertexGlTemplate",()=>i),e(t.exports,"fragmentGlTemplate",()=>a);let o=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}
        
        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);
       
        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,n=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;
   
    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {
        
        {{start}}

        var outColor:vec4<f32>;
      
        {{main}}
        
        return outColor * vColor;
      };
`,i=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;
        
        {{start}}
        
        vColor = vec4(1.);
        
        {{main}}
        
        vUV = uv;
        
        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,a=`
   
    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {
        
        {{start}}

        vec4 outColor;
      
        {{main}}
        
        finalColor = outColor * vColor;
    }
`}),r("8hMvn",function(t,r){e(t.exports,"globalUniformsBit",()=>o),e(t.exports,"globalUniformsBitGl",()=>n);let o={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}},n={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}}}),r("cNnNT",function(t,r){e(t.exports,"colorBit",()=>o),e(t.exports,"colorBitGl",()=>n);let o={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},n={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}}}),r("ikSZA",function(t,r){e(t.exports,"generateTextureBatchBit",()=>n),e(t.exports,"generateTextureBatchBitGl",()=>a);let o={};function n(e){return o[e]||(o[e]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;
    
                ${function(e){let t=[];{let e=0;for(let r=0;r<16;r++)t.push(`@group(1) @binding(${e++}) var textureSource${r+1}: texture_2d<f32>;`),t.push(`@group(1) @binding(${e++}) var textureSampler${r+1}: sampler;`)}return t.join("\n")}(0)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);
    
                ${function(e){let t=[];t.push("switch vTextureId {");for(let e=0;e<16;e++)15===e?t.push("  default:{"):t.push(`  case ${e}:{`),t.push(`      outColor = textureSampleGrad(textureSource${e+1}, textureSampler${e+1}, vUV, uvDx, uvDy);`),t.push("      break;}");return t.push("}"),t.join("\n")}(16)}
            `}}),o[e]}let i={};function a(e){return i[e]||(i[e]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;
              
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;
    
                uniform sampler2D uTextures[${e}];
              
            `,main:`
    
                ${function(e){let t=[];for(let e=0;e<16;e++)e>0&&t.push("else"),e<15&&t.push(`if(vTextureId < ${e}.5)`),t.push("{"),t.push(`	outColor = texture(uTextures[${e}], vUV);`),t.push("}");return t.join("\n")}(0)}
            `}}),i[e]}}),r("kSpdC",function(t,r){e(t.exports,"roundPixelsBit",()=>o),e(t.exports,"roundPixelsBitGl",()=>n);let o={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32> 
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},n={name:"round-pixels-bit",vertex:{header:`   
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {       
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}}}),r("huPGn",function(t,r){e(t.exports,"localUniformBit",()=>o),e(t.exports,"localUniformBitGroup2",()=>n),e(t.exports,"localUniformBitGl",()=>i);let o={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},n={...o,vertex:{...o.vertex,header:o.vertex.header.replace("group(1)","group(2)")}},i={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}}});
//# sourceMappingURL=browserAll.ef84d78a.js.map
