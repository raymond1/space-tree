# What is space tree notation?
Space tree notation is a notation for expressing hierarchical parent-child relationships between strings organized in a tree. The exact specification for the formatting of a space tree string is in the file 'specification.txt', but basically, space tree notation looks something like the following:

```Entity
 Raymond
  parts
   head
    face
     mouth
     eyes
     nose
    ears
    hair
 E32443A the modem
  parts
   front
    panel
     lights
      power
      download
      Wifi
     capability icons
      video conferencing
      telephone calls
```

# What is contained in this repository?
This repository is meant to store the somewhat formal specification for space tree notation along with a small library meant for manipulating data stored in space tree notation.

# Benefits of using space tree notation
Space tree notation has a very simple syntax and makes it easy for humans to encode hierarchical information and indicate sibling relationships amongst different pieces of information. It does not require much time for people to learn and is exact enough for machines to understand. It can be used as a kind of bridging tool between man and machine that is easier to learn than more complicated programming languages that can express this same information.