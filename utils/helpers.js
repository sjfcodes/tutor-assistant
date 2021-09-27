module.exports = {
    updateDocumentProerties: (allowUpdate, currentDoc, newProps) => {
        for (const [key, value] of Object.entries(newProps)) {
            if (key === 'email' && currentDoc.email === newProps.email) continue
            if (allowUpdate[key]) currentDoc[key] = value
        }
    }
}