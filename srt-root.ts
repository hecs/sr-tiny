import { h1, p, event, getRefs, div, audio, source, img } from 'tiny-html-builder/lib/tag'

const channelsResponse = await fetch("http://api.sr.se/api/v2/channels/?format=json&pagination=false&audioquality=hi");
const channels = await channelsResponse.json() as Channels;
const app = (
    div(`display: flex;flex-direction: column;`, [
        h1({}, "Tiny Sveriges Radio"),
        p({}, `Audio: ${channels.copyright}`),
        div("display: flex; justify-content: center",
            img({
                style: { maxWidth: "100vw" },
                ref: "posterRef"
            })
        ),
        audio({
            style: "margin:20px; width: auto;",
            controls: true,
            ref: "audioRef"
        }, source({
            type: "audio/mpeg",
            ref: "sourceRef"
        })),
        div({ style: { display: "grid", gridGap: "10px", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" } },
            channels.channels.map((c) =>
                event("click", e => play(c, true),
                    div("card", [
                        img({
                            class: "thumb",
                            src: c.image,
                            alt: c.name
                        }),
                        c.name
                    ])
                )
            )
        )
    ])
);

const {
    audioRef,
    sourceRef,
    posterRef
} = getRefs(app);

const play = (channel: Channel, autoplay: boolean): void => {
    posterRef.src = channel.image;
    sourceRef.src = channel.liveaudio.url;
    audioRef.load();
    autoplay && audioRef.play();
}

play(channels.channels[0], false);

document.body.append(app);
