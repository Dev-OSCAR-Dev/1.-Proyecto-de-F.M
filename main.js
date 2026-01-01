const root = document.getElementById('root');

fetch("./data.json")
    .then(res => {
        return res.json()
    }).then(data => {
        getData(data)
    })

function getData(data) {
    // contenedor principal
    const container = document.createElement("div");
    container.classList.add("container");

    const header = document.createElement("div");
    header.classList.add("header");
    const TextHeader = document.createElement("div");
    TextHeader.classList.add("text-header")
    TextHeader.innerText = "Notifications";
    const spanMount = document.createElement("div");
    spanMount.classList.add("span-mount");
    spanMount.innerText = countMessages();

    function countMessages() {
        let count = 0;
        data.forEach(element => { if (element.read === false) count++ });
        return count;
    };

    const markRead = document.createElement("button");
    markRead.classList.add("mark-read");
    markRead.innerText = "Mark all as read";

    header.append(TextHeader, spanMount, markRead);

    const body = document.createElement("div");
    body.classList.add("body");

    data.forEach(dataCard => {
        const card = document.createElement("div");
        card.classList.add("card");

        const profile = document.createElement("div");
        profile.classList.add("profile");
        const imageProfile = document.createElement("img");
        imageProfile.classList.add("image-profile")
        imageProfile.src = dataCard.profile;
        profile.appendChild(imageProfile);

        const dataText = document.createElement("div");
        dataText.classList.add("data-text");
        const username = document.createElement("p");
        username.classList.add("user-name");
        const name = document.createElement("span")
        name.classList.add("name")
        name.innerText = dataCard.username;
        const typePost = document.createElement("span");
        typePost.classList.add("type-post");
        typePost.innerText = dataCard.typePost;
        const titlePost = document.createElement("span");
        titlePost.classList.add("title-post");
        titlePost.innerText = dataCard.titlePost;
        const club = document.createElement("span");
        club.classList.add("club");
        club.innerText = dataCard.club;
        username.append(name, typePost, titlePost, club);

        if (dataCard.read === false) {
            card.classList.add("not-read");
            const point = document.createElement("span");
            point.classList.add("point");
            username.appendChild(point)
        };
        const timePost = document.createElement("div");
        timePost.classList.add("time-post");
        timePost.innerText = dataCard.timePost;
        username.appendChild(timePost);

        dataText.append(username);

        if (dataCard.messagePost != "") {
            dataText.classList.add("Text");
            const messagePost = document.createElement("div");
            messagePost.classList.add("message-post");
            messagePost.innerText = dataCard.messagePost;
            dataText.append(messagePost);
        };
        if (dataCard.imageClub != "") {
            const boxImageClub = document.createElement("div");
            boxImageClub.classList.add("box-imageClub");
            const imageClub = document.createElement("img");
            imageClub.classList.add("image-club");
            imageClub.src = dataCard.imageClub;
            boxImageClub.appendChild(imageClub);
            dataText.appendChild(boxImageClub);
        }

        card.append(profile, dataText);
        body.append(card);
    });

    container.append(header, body);
    root.appendChild(container);
}