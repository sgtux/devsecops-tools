import json

horusec_output = None

with open('./output-sonar.json') as f:
    horusec_output = json.loads(f.read())

def normalize_location(location):
    if location == None or 'filepath' not in location or location['filepath'] == '':
        return None

    location['filePath'] = location['filepath']
    del location['filepath']

    if 'textRange' in location:
        textRange = location['textRange']
        if textRange['startLine'] == 0:
            textRange['startLine'] = 1

        if textRange['endLine'] == 0:
            textRange['endLine'] = textRange['startLine']

        if textRange['startColumn'] == 0:
            textRange['startColumn'] = 1

        if textRange['endColumn'] == 0:
            with open(location['filePath']) as f:
                line = f.readlines()[textRange['startLine'] -1 ]
                textRange['endColumn'] = len(line) - 1
    return location

issues = horusec_output['issues']

result = {'issues': []}

for i in issues:
    if 'primaryLocation' in i:
        if normalize_location(i['primaryLocation']) != None:
            result['issues'].append(i)

    if 'secondaryLocations' in i:
        normalize_location(i['secondaryLocations'])

with open('./sonar-parsed.json', 'w') as f:
    f.write(json.dumps(result))