class SpaceTree{

  //Assumes s contains a space tree which has had some of its first few lines truncated.
  //
  //Takes in a string s containing line breaks and finds the depth of the first line.
  //Afterwards, the location where the depth becomes less than or equal to the depth of the first line is
  //considered the end of the node that started on the first line of the input string.
  static GetFirstSubtreeFromTruncatedSpaceTree(s){
    //1)Get depth of first line, which should contain the node name
    let firstNodeDepth = SpaceTree.GetDepth(s)

    //2)Go line by line until a lower or equal depth has been reached. That should be the end of the current node
    let lines = s.split('\n')

    let nodeString = lines[0] + '\n'
    for (let i = 1; i < lines.length; i++){
      let line = lines[i]
      let lineDepth = SpaceTree.GetDepth(line)
      if (lineDepth <= firstNodeDepth){
        break
      }

      //No delimiter at end of last line
      let delimiter = '\n'
      if (i == lines.length -1){
        delimiter = ''
      }
      nodeString += lines[i] + delimiter
    }
    return nodeString
  }


  //s: a string in SpaceTree format, starting with a node string
  //This function returns the number of child elements of the first node of the string s
  static GetNumberOfChildren(s){
    let lines = s.split('\n')
    let firstNodeDepth = SpaceTree.GetDepth(s)
    let numberOfChildren = 0
    for (let i = 1; i < lines.length; i++){
      let line = lines[i]
      let lineDepth = SpaceTree.GetDepth(line)
      if (lineDepth <= firstNodeDepth){
        break
      }
      if (lineDepth == firstNodeDepth + 1){
        numberOfChildren++
      }
    }
    return numberOfChildren
  }

  //Given a string s, returns the number of distinct root nodes
  static GetNumberOfTopLevelNodes(s){
    let rootNodes = 0
    let lines = s.split('\n')
    for (let line of lines){
      if (line.length > 0 && line.substring(0,1) !== ' '){
        rootNodes += 1
      }
    }
    return rootNodes
  }


  //Takes in a tree subtree in SpaceTree format, possibly a part of a tree with leading spaces, and returns the children of the node on the first line. The children
  //are returned as strings
  //Assumes input string is the complete node string for a single node
  static GetChildSubtrees(s){
    let childNodes = []
    let lines = s.split('\n')
    let firstNodeDepth = SpaceTree.GetDepth(s)

    //For all other nodes, return an array of the child node strings
    let numberOfChildren = 0
    let previousNodeDepth = firstNodeDepth
    for (let i = 1; i < lines.length; i++){
      let currentDepth = SpaceTree.GetDepth(lines[i])
      
      //Check if lines are well-formed
      if (currentDepth == previousNodeDepth + 1 || currentDepth <= previousNodeDepth && currentDepth > firstNodeDepth){
        if (currentDepth == firstNodeDepth + 1){
          numberOfChildren++
          childNodes.push(lines[i].slice())
        }else{
          childNodes[numberOfChildren-1] += '\n' + lines[i].slice()
        }
        //Well formed
      } else if (currentDepth > previousNodeDepth + 1){
        throw new Error(`Error: parser definition is invalid due to non-consecutive node depths detected ${i} line(s) from the first.`)
      }
      else{
        break
      }

      previousNodeDepth = currentDepth
    }

    return childNodes
  }

  //Given a string s in SpaceTree format, returns the number of spaces before the first line in s. The number of
  //spaces is called the depth.
  static GetDepth(s){
    let numberOfSpaces = 0
    for (let i = 0; i < s.length; i++){
      if (s.substring(i,i+1) == ' '){
        numberOfSpaces += 1
      }else{
        break
      }
    }
    return numberOfSpaces
  }

  //Returns the index of the first line with a particular depth in depthArray such that
  //the line number is greater than or equal to startingLine
  static GetFirstLineWithDepth(depthArray, firstNodeDepth, startingLine = 1){
    for (let i = 0; i < depthArray.length; i++){
      if (depthArray[i] == firstNodeDepth){
        if (i >= startingLine){
          return firstNodeDepth
        }
      }
    }

    return -1
  }

  //Obtains the content of the nodes with depth 0
  static GetTopLevelNodesContent(s){
    let lines = s.split('\n')
    let returnLines = []
    for (let i = 0; i < lines.length; i++){
      let line = lines[i]
      if (SpaceTree.GetDepth(line) == 0){
        returnLines.push(line)
      }
    }
    return returnLines
  }

  //Assumes there could potentially be multiple depth 0 elements with no overarching root
  //Returns all nodes of depth 0
  //Assumes s is well-formed
  static GetTopLevelSubtrees(s){
    let lines = s.split('\n')
    let returnLineNumbers = []
    let returnLines = []
    for (let i = 0; i < lines.length; i++){
      let line = lines[i]
      if (SpaceTree.GetDepth(line) == 0){
        returnLineNumbers.push(i)
      }
    }
    returnLineNumbers.push(lines.length)

    for (let i = 0; i < returnLineNumbers.length-1; i++){
      let accumulatorString = []
      for (let j = returnLineNumbers[i]; j < returnLineNumbers[i+1]; j++){
        accumulatorString.push(lines[j])
      }
      let tempString = accumulatorString.join('\n')
      returnLines.push(tempString)
    }
    return returnLines
  }

  //Given a line, s, which contains 0 or more line breaks, this function returns the string from the beginning
  //until the first line break, or until the end of the line.
  static ReadOneLine(s){
    let firstNewLineLocation = s.indexOf('\n')
    if (firstNewLineLocation < 0){
      return s
    }else{
      return s.substring(0,firstNewLineLocation)
    }
  }

  //Takes in a node string s and returns the first line, which is returned without the carriage return and leading spaces
  static GetText(s){
    let depth = SpaceTree.GetDepth(s)

    let nodeName = SpaceTree.ReadOneLine(s).substring(depth)
    return nodeName
  }

  //Returns n spaces
  static EncodeDepth(n){
    return ' '.repeat(n)
  }

  //Given a string in spacetree notation, this function returns a dictionary
  //{<lineNumber1>: <node string 1>, <lineNumber2>:<node string 2>}
  static GetAllNodesOfDepth(s, n){
    let returnDictionary = {}

    let lines = s.split('\n')
    for (let i = 0; i < lines.length; i++){
      let depth = SpaceTree.GetDepth(lines[i])
      if (depth == n){
        returnDictionary[i] = lines[i].substring(n)
      }
    }
    return returnDictionary
  }

  // //
  // static GetChildSubtreesFromDepthAndKey(s, depth, key){
  //   let lines = s.split('\n')
  //   let childNodeStrings = []

  //   let i = 0
  //   for(let line of lines){
  //     if (SpaceTree.GetDepth(line) == depth && SpaceTree.GetText(line) == key){
  //       children = SpaceTree.GetChildSubtrees()
  //       break
  //     }
  //     i++
  //   }
  // }

  //Given a space tree string, returns a JavaScript object
  //Every node is given its own JavaScript object node
  static ConvertStringToObject(s){
    let currentNode = {
      text: '',
      children:[]
    }
    currentNode.text = SpaceTree.GetText(s)

    let children = SpaceTree.GetChildSubtrees(s)
    for (let i = 0; i < children.length;i++){
      let childNode = SpaceTree.ConvertStringToObject(children[i])
      currentNode.children.push(childNode)
    }
    return currentNode
  }

  //filter examples
  //text
  // apple
  //
  //Will return all line numbers with nodes containing the node text apple

  //depth
  // >/</=
  // 0
  //
  //Will return all subtrees equal to a particular depth
  static Filter(s, filter){
    let filterLines = filter.split('\n')
    let sLines = s.split('\n') //Lines of string s that was passed in
    let returnLineNumbers = []
    switch (filterLines[0]){
      case 'text':
        //get all nodal subtrees starting with the text given in the next line
        let targetText = SpaceTree.GetText(filterLines[1])
        for (let i = 0; i < sLines.length; i++){
          if (SpaceTree.GetText(sLines[i]) == targetText){
            returnLineNumbers.push(i)
          }
        }
        return returnLineNumbers
      case 'depth':
        let operator = SpaceTree.GetText(filterLines[1])
        if (filterLines.length < 3){
          let errorMessage = `Depth filter syntax should be:
depth
 <operator> (one of =,>,<,>=,<=)
 <target depth> (a non-negative integer)`
          throw new Error(errorMessage)
        }
        let targetDepth = SpaceTree.GetText(filterLines[2])
        for (let i = 0; i < sLines.length; i++){
          switch (operator){
            case '<=':
              if (SpaceTree.GetDepth(sLines[i]) <= targetDepth){
                returnLineNumbers.push(i)
              }
              break
            case '<':
              if (SpaceTree.GetDepth(sLines[i]) < targetDepth){
                returnLineNumbers.push(i)
              }
              break
            case '>':
              if (SpaceTree.GetDepth(sLines[i]) > targetDepth){
                returnLineNumbers.push(i)
              }
              break
            case '>=':
              if (SpaceTree.GetDepth(sLines[i]) >= targetDepth){
                returnLineNumbers.push(i)
              }
              break
            case '=':
              if (SpaceTree.GetDepth(sLines[i]) == targetDepth){
                returnLineNumbers.push(i)
              }
              break
            default:
              throw new Error("Unknown operator")
          }
        }
        return returnLineNumbers
        break
    }
  }


  //Assumes a tree with a single root, but possibly extra spaces
  //Returns a string with the minimum number of leading spaces to retain the hierarchical information of s.
  static Redepth(s){
   let lines = s.split('\n')
   let firstDepth = SpaceTree.GetDepth(s)

   let outputString = ''
   for (let line of lines){
    outputString += line.substring(firstDepth) + '\n'
   }
   return outputString
  }
}

export default SpaceTree