# API docs
## URL Routes and Returns
### ``newpost``
Submit a post request with a json object with the following fields:
- ``title``: string
- ``topic``: topic ID
- ``content``: string
- ``parent``: None or post ID of parent
Will return a json object with ``{"message":"Success"}`` or ``{"message":"Failed"}``, depending on if it fails or not.

### ``getpost/<int:id>/``
Gets a given post from ID and its children.
Returns a json object that is a list of posts.

### ``images``
Saves a given image. Send post request with the following fields:
- ``post``: post ID
- ``image``: image to save

### ``images/<int:id>/``
Gets a given image via ID.
Returns a path to the image to display.

### ``newtopic``
Creates a new topic. Send post request with the following fields:
- ``title``: string
- ``description``: string

### ``gettopic/<int:id>/``
Gets a given topic via ID.
Returns a json object of a topic and all posts for that topic. TODO: change this to only give a few?

### ``gettopics``
Gets all topics.
Returns a json object of a list of all topics.

## Return Values
### ``getpost/<int:id>/``
```json
{
    "posts": [
        {
            "id":<post ID>,
            "user":<post creater username>,
            "topic":<topic title>,
            "title":<post title>,
            "content":<post content>,
        },
    ]
}
```

### ``images/<int:id>/``
```json
{
    "path":<image path>,
}
```

### ``gettopic/<int:id>/``
```json
{
    "title":<topic title>,
    "description":<topic description>,
    "posts": [
        {
            "id":<post ID>,
            "user":<post creater username>,
            "topic":<topic title>,
            "title":<post title>,
            "content":<post content>,
        },
    ],
}
```

### ``images/<int:id>``
```json
{
    "path":<path to image>,
    "width":<width of image>,
    "height":<height of image>,
}
```
