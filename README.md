# Martin Quarry

The following is an interactive display of Martin Sprokets products in action. 

Url for viewing: http://mq.dev2.barn3s.com/

---

## How the data is stored

Since we aren't using a database, the data for the products has to be stored somewhere. For this project, I decided a simple JSON string would work. Simple is better.

You can see this JSON string in the data.js file in the /js folder.

## How to edit the data

The string in the data.js file is minified (all on one line) beceause JSON can not be read with line breaks which makes editing difficult. Here is the process you can use for updating the data.

I have included a data.txt file in the /js folder. In this file, you will find these instructions.

>1) copy the string below into a text editor.
>2) make your edits
>3) minify the string to one line (no line breaks)
>4) replace the string in the data.js file. Or delete everything and add this:

You will also find a lot of text that starts like this:

```json
{
  "start": {
    "bg": "/images/home.jpg",
    ...
```

Everything from that line down is the JSON string. Line breaks are present for readability and ease of editing. Copy that long string of data to a text file* and make your edits.

Once edits are made, you will need to minify the string. You can do this using this website: https://www.minifier.org/ Simply copy/paste your edited JSON into the text box and select js.

[How to minify.](https://i.imgur.com/CHTF3uo.png)

Once that is done, you can remove everything from the data.js file. Readd the following code:

```js
const rawdata = '';
```

Then, take your minified text from minifier.org and paste it inbetween the two single quotes. 

Save the file.

If there are no errors in your JSON, the site will load and your edits were successful.

---

## Citations and Notes

*Not Microsoft Word or any other word processor.