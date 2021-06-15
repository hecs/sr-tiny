import { tag, event, AttrsClassesStyles } from 'tiny-html-builder'

const channelsResponse = await fetch("http://api.sr.se/api/v2/channels/?format=json&pagination=false&audioquality=hi");
const channels = await channelsResponse.json() as Channels;

const div = (config: AttrsClassesStyles, children) => tag('div', config, children),
    h1 = text => tag("h1", {}, text),
    p = text => tag("p", {}, text),
    img = (config: AttrsClassesStyles) => tag("img", config) as HTMLImageElement;

const source = tag('source', {
    type: "audio/mpeg"
}) as HTMLSourceElement;

const audio = tag('audio', {
    style: "margin:20px; width: auto;",
    controls: ""
}, source) as HTMLAudioElement;

const poster = img("max-width: 100vw");

const play = (channel: Channel, autoplay: boolean): void => {
    poster.src = channel.image;
    source.src = channel.liveaudio.url;
    audio.load();
    autoplay && audio.play();
}

const app = div(`display: flex;flex-direction: column;`, [
    h1("Tiny Sveriges Radio"),
    p(`Audio: ${channels.copyright}`),
    div("display: flex; justify-content: center", poster),
    audio,
    div("display: grid; grid-gap: 10px; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));",
        channels.channels.map((c) =>
            event("click", e => play(c, true),
                div("card", [
                    img({
                        class: "thumb",
                        src: c.image,
                        alt: c.name,
                    }),
                    c.name
                ])
            )
        )
    )
]);

play(channels.channels[0], false);

document.body.append(tag("style", { rel: "stylesheet" },
    `body {
    font-family: sans-serif;
    margin:20px;
    background: #111;
    color: #fff;
}
.card {
    border-radius: 8px;
    cursor: pointer;
    transition: .2s all;
    background: #000;
    text-align: center;
    padding: 10px;
}
.thumb {
    object-fit: cover;
    width: 100%;
    margin-bottom: 6px;
}
.card:hover {
    transform: scale(1.2) rotate(-3deg);
    box-shadow: 0px 0 80px -15px #fff;
}
`), app)
